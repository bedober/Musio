const tracks = [
  { title: "Midnight in Kampala", artist: "Ayo Keys", genre: "Afrobeats", color: "violet" },
  { title: "Golden Hour", artist: "Nia Rose", genre: "R&B", color: "orange" },
  { title: "Closer to Home", artist: "The Nile", genre: "Afro-pop", color: "blue" },
  { title: "Slow Motion", artist: "Kato", genre: "Amapiano", color: "green" },
];

export default function Home() {
  return (
    <main className="shell">
      <aside className="sidebar">
        <a className="brand" href="#"><span className="brand-mark">M</span> musio</a>
        <p className="nav-label">YOUR SPACE</p>
        <a className="nav-item active" href="#discover">◈ <span>Discover</span></a>
        <a className="nav-item" href="#library">▤ <span>Your library</span></a>
        <a className="nav-item" href="#artists">♫ <span>For artists</span></a>
        <div className="sidebar-bottom">
          <div className="profile-avatar">BP</div>
          <div><strong>Welcome back</strong><small>Listener workspace</small></div>
        </div>
      </aside>
      <section className="content">
        <header className="topbar">
          <div className="crumb">Musio <span>/</span> Discover</div>
          <div className="top-actions"><span className="status"><i /> All systems ready</span><button className="avatar-button" aria-label="Profile">BP</button></div>
        </header>
        <div className="hero" id="discover">
          <div className="hero-copy">
            <span className="eyebrow">YOUR SOUND. YOUR WORLD.</span>
            <h1>Every sound has<br /><em>a home.</em></h1>
            <p>Discover your next favourite. Find new voices. Support the artists moving music forward.</p>
            <a className="primary-button" href="#tracks">Explore music <span>↗</span></a>
          </div>
          <div className="hero-art" aria-label="Abstract music artwork">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="vinyl"><div className="vinyl-center">M</div></div>
            <span className="floating-note note-one">♫</span><span className="floating-note note-two">♪</span>
            <span className="art-caption">MADE OF MUSIC <b>✳</b></span>
          </div>
        </div>
        <div className="section-heading" id="tracks"><div><span className="eyebrow">CURATED FOR YOU</span><h2>On your frequency</h2></div><a href="#library">View all ↗</a></div>
        <div className="track-grid">
          {tracks.map((track, i) => <article className="track-card" key={track.title}>
            <div className={`cover cover-${track.color}`}><span className="cover-number">0{i+1}</span><span className="cover-symbol">{["◉","✳","◌","✺"][i]}</span><span className="cover-word">MUSIO<br/>SESSIONS</span></div>
            <div className="track-meta"><div><h3>{track.title}</h3><p>{track.artist}</p></div><span className="play-button" aria-label={`Preview ${track.title}`}>▶</span></div>
            <div className="track-genre">{track.genre}<span>FEATURED</span></div>
          </article>)}
        </div>
        <section className="artist-banner" id="artists"><div><span className="eyebrow">MADE FOR THE MAKERS</span><h2>Your music deserves<br/>to travel further.</h2><p>Build your profile, manage releases, and understand your audience—all in one place.</p></div><a className="light-button" href="mailto:artists@musio.example">Artist tools <span>↗</span></a></section>
        <footer><a className="brand footer-brand" href="#"><span className="brand-mark">M</span> musio</a><span>Music connects us all.</span><span>© 2026 Musio</span></footer>
      </section>
    </main>
  );
}
