@extends('layouts.app', ['title' => ($role ?? 'Listener').' workspace · Musio'])
@section('content')
@php($role = $role ?? 'Listener')
<section class="dashboard-welcome"><span class="eyebrow">{{ strtoupper($role) }} WORKSPACE</span><h1>Your sound. Your world.</h1><p>Manage releases, understand your audience, and follow your progress.</p><a class="primary-button" href="{{ route('home') }}">Explore music <span>→</span></a></section>
<section class="stats-grid"><article class="stat-card"><span>Total streams</span><strong>24.8K</strong><small>Illustrative metric</small></article><article class="stat-card"><span>Releases</span><strong>8</strong><small>2 awaiting review</small></article><article class="stat-card"><span>Audience reach</span><strong>12.4K</strong><small>Demo data</small></article></section>
<section class="data-panel"><div class="section-heading"><div><span class="eyebrow">WORKSPACE ACTIVITY</span><h2>Recent releases</h2></div><span class="demo-tag">DEMO DATA</span></div>@foreach(['Nkwagala' => 'Single · 12 Sep 2026', 'Blue Hour' => 'EP · 28 Aug 2026', 'Stay Close' => 'Single · 04 Aug 2026'] as $title => $description)<div class="data-row"><div class="row-icon">♫</div><div class="row-copy"><strong>{{ $title }}</strong><small>{{ $description }}</small></div><span class="row-status">Live</span><span>→</span></div>@endforeach</section>
@endsection
