-- Musio profiles: apply through the Supabase SQL editor or migrations pipeline.
-- Public users cannot assign or change their own role. Privileged roles are granted
-- only by a trusted server-side administrative workflow.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (char_length(full_name) between 1 and 120),
  email text not null,
  role text not null default 'Listener'
    check (role in ('Listener', 'Artist', 'Management', 'Label', 'Platform Admin')),
  account_status text not null default 'pending_verification'
    check (account_status in ('pending_verification', 'active', 'suspended')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile"
  on public.profiles for select
  to authenticated
  using (id = (select auth.uid()));

revoke all on table public.profiles from anon, authenticated;
grant select on table public.profiles to authenticated;
grant all on table public.profiles to service_role;

comment on table public.profiles is
  'Musio account profile. Roles and account status are server-managed; never trust browser-selected roles.';
