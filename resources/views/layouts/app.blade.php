<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title ?? 'Musio' }}</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>
    <main class="shell">
        <aside class="sidebar">
            <a class="brand" href="{{ route('home') }}"><span class="brand-mark">♫</span>musio<span class="lime">.</span></a>
            <span class="nav-label">WORKSPACE</span>
            <div class="role-select">{{ $role ?? 'Listener' }}</div>
            <span class="nav-label">YOUR MENU</span>
            @foreach(($nav ?? ['Discover', 'Your library', 'Playlists']) as $item)
                <a class="nav-item {{ $loop->first ? 'active' : '' }}" href="{{ route('dashboard') }}">◈ {{ $item }}</a>
            @endforeach
            <div class="sidebar-bottom"><span class="profile-avatar">{{ strtoupper(substr(auth()->user()->name ?? 'M', 0, 1)) }}</span><div><strong>{{ auth()->user()->name ?? 'Musio preview' }}</strong><small>{{ auth()->check() ? 'Verified workspace' : 'Prototype environment' }}</small></div></div>
        </aside>
        <div class="content">
            <header class="topbar"><span class="crumb">Musio <span>/</span> {{ $role ?? 'Listener' }}</span><div class="top-actions"><span class="status"><i></i> Uganda first</span>@auth <form method="POST" action="{{ route('logout') }}">@csrf<button class="avatar-button" type="submit" aria-label="Sign out">{{ strtoupper(substr(auth()->user()->name, 0, 1)) }}</button></form>@else<a class="avatar-button" href="{{ route('login') }}" aria-label="Sign in">M</a>@endauth</div></header>
            @yield('content')
        </div>
    </main>
</body>
</html>
