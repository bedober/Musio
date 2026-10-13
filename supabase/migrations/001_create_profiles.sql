create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  role text not null default 'Listener' check (
    role in ('Listener', 'Artist', 'Management', 'Label', 'Platform Admin')
  ),
  account_status text not null default 'pending_verification' check (
    account_status in ('pending_verification', 'active', 'suspended', 'rejected')
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read their own profile"
on public.profiles
for select
using (auth.uid() = id);

create policy "Users can update their own profile"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Platform admins can manage all profiles"
on public.profiles
for all
using (
  exists (
    select 1
    from public.profiles as admin
    where admin.id = auth.uid()
      and admin.role = 'Platform Admin'
  )
)
with check (
  exists (
    select 1
    from public.profiles as admin
    where admin.id = auth.uid()
      and admin.role = 'Platform Admin'
  )
);

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, role, account_status)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', 'Musio User'),
    new.email,
    coalesce(new.raw_user_meta_data ->> 'role', 'Listener'),
    'pending_verification'
  )
  on conflict (id) do update
    set full_name = excluded.full_name,
        email = excluded.email,
        role = excluded.role,
        updated_at = now();

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user_profile();
