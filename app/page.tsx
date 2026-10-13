"use client";

import { useMemo, useState } from "react";

type Role = "Listener" | "Artist" | "Management" | "Label" | "Platform Admin";
type Track = { id: number; title: string; artist: string; genre: string; plays: string; color: string; symbol: string; };

const tracks: Track[] = [
  { id: 1, title: "Nkwagala", artist: "Ayo Nia", genre: "Afrobeats", plays: "248K", color: "orange", symbol: "♫" },
  { id: 2, title: "Kampala Nights", artist: "Vince K", genre: "Afro-fusion", plays: "193K", color: "violet", symbol: "◉" },
  { id: 3, title: "Slow Down", artist: "Luna Rey", genre: "R&B", plays: "167K", color: "blue", symbol: "♪" },
  { id: 4, title: "Tugende", artist: "The Pearl Band", genre: "Afro-pop", plays: "142K", color: "green", symbol: "♬" },
];

const roleContent: Record<Exclude<Role, "Listener">, { eyebrow: string; title: string; sub: string; stats: [string, string, string][]; rows: [string, string, string][]; action: string }> = {
  Artist: { eyebrow: "ARTIST WORKSPACE", title: "Your music, moving forward.", sub: "Manage releases, understand your audience, and follow your earnings.", stats: [["Total streams", "24.8K", "Demo metric"], ["Estimated earnings", "UGX 186K", "Illustrative only"], ["Releases", "8", "2 awaiting review"]], rows: [["Nkwagala", "Single · 12 Sep 2026", "Live"], ["Blue Hour", "EP · 28 Aug 2026", "Live"], ["Stay Close", "Single · 04 Aug 2026", "In review"]], action: "＋ Submit release" },
  Management: { eyebrow: "MANAGEMENT WORKSPACE", title: "Every artist, one view.", sub: "Coordinate campaigns, releases, and artist performance.", stats: [["Artists managed", "12", "Demo roster"], ["Active campaigns", "4", "Illustrative data"], ["Upcoming releases", "6", "Next 30 days"]], rows: [["Ayo Nia", "Nkwagala campaign", "On track"], ["Kairo", "Midnight Taxi rollout", "Scheduled"], ["Zuri", "Omalawo campaign", "Live"]], action: "＋ New campaign" },
  Label: { eyebrow: "LABEL WORKSPACE", title: "Build a catalogue that travels.", sub: "Manage your roster, releases, statements, and label performance.", stats: [["Roster artists", "10", "Demo roster"], ["Catalog releases", "38", "Illustrative data"], ["Estimated royalties", "UGX 2.4M", "Not payable"]], rows: [["Midnight Taxi", "Kairo · Single", "Live"], ["After Rain", "Aster · EP", "In review"], ["No Pressure", "Zuri · Single", "Live"]], action: "＋ Add artist" },
  "Platform Admin": { eyebrow: "PLATFORM OPERATIONS", title: "The pulse of Musio.", sub: "Monitor catalog health, platform activity, and payout operations.", stats: [["Platform plays", "1.28M", "Illustrative metric"], ["Active artists", "846", "Demo count"], ["Pending reviews", "23", "Needs moderation"]], rows: [["Release metadata check", "Aster — After Rain", "Needs review"], ["Royalty import", "Q3 statement batch", "In progress"], ["Payout verification", "7 requests", "Needs review"]], action: "Review queue" },
};

export default function HomePage() {
  const [role, setRole] = useState<Role>("Listener");
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const [playing, setPlaying] = useState<number | null>(null);
  const [liked, setLiked] = useState<number[]>([2]);
  const [notice, setNotice] = useState("");
  const filtered = useMemo(() => tracks.filter(t => (genre === "All" || t.genre === genre) && (t.title + " " + t.artist + " " + t.genre).toLowerCase().includes(query.toLowerCase())), [genre, query]);
  const selectRole = (next: Role) => { setRole(next); setNotice(next + " workspace preview selected. Demo data only."); };
  const action = (message: string) => setNotice(message);
  const workspace = role === "Listener" ? null : roleContent[role];

  return (
    <main className="shell">
      <aside className="sidebar">
        <a className="brand" href="/" aria-label="Musio home"><span className="brand-mark">♫</span><span>musio<span style={{ color: "var(--lime)" }}>.</span></span></a>
        <div className="nav-label">WORKSPACE</div>
        <div className="role-select-wrap"><select className="role-select" value={role} onChange={e => selectRole(e.target.value as Role)} aria-label="Choose workspace"><option>Listener</option><option>Artist</option><option>Management</option><option>Label</option><option>Platform Admin</option></select></div>
        <div className="nav-label">YOUR MENU</div>
        {(role === "Listener" ? ["Discover", "Your library", "Playlists"] : role === "Artist" ? ["Overview", "My releases", "Audience", "Royalties"] : role === "Management" ? ["Overview", "Artists", "Campaigns", "Release calendar"] : role === "Label" ? ["Overview", "Roster", "Catalog", "Royalties"] : ["Overview", "Catalog review", "Payout operations", "Platform analytics", "Security & roles"]).map((item, i) => <button key={item} className={"nav-item " + (i === 0 ? "active" : "")} onClick={() => action(item + " is a prototype section. Database integration is next.")}><span>{["◈", "♫", "♡", "▦", "◉"][i % 5]}</span>{item}</button>)}
        <div className="sidebar-bottom"><span className="profile-avatar">M</span><div><strong>Musio preview</strong><small>Prototype environment</small></div></div>
      </aside>
      <div className="content">
        <header className="topbar"><div className="crumb">Musio <span>/</span> {role}</div><div className="top-actions"><label className="search-input"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search tracks and artists" /></label><span className="status"><i /> Uganda first</span><a className="avatar-button" href="/login" aria-label="Sign in to your Musio account">M</a></div></header>
        {workspace ? <>
          <section className="dashboard-welcome"><span className="eyebrow">{workspace.eyebrow}</span><h1>{workspace.title}</h1><p>{workspace.sub}</p><button className="primary-button" onClick={() => action("This action will be enabled after secure sign-in and database integration.")}>{workspace.action} <span>→</span></button></section>
          <section className="stats-grid">{workspace.stats.map(([label, value, detail]) => <article className="stat-card" key={label}><span>{label}</span><strong>{value}</strong><small>{detail}</small></article>)}</section>
          <section className="data-panel"><div className="section-heading"><div><span className="eyebrow">WORKSPACE ACTIVITY</span><h2>{role === "Platform Admin" ? "Operations queue" : role === "Artist" ? "Recent releases" : role === "Label" ? "Catalog overview" : "Artist activity"}</h2></div><span className="demo-tag">DEMO DATA</span></div>{workspace.rows.map(([title, desc, status]) => <div className="data-row" key={title}><div className="row-icon">♫</div><div className="row-copy"><strong>{title}</strong><small>{desc}</small></div><span className="row-status">{status}</span><button onClick={() => action("Record details require a verified account and live database.")} aria-label={"Open " + title}>→</button></div>)}</section>
          <div className="security-callout"><strong>🔒 Security by design</strong><p>These workspace switchers are for preview only. Real role permissions, payout approvals, and private catalog access must be enforced server-side after login.</p></div>
        </> : <>
          <section className="hero">
            <div className="hero-copy"><span className="eyebrow">UGANDA FIRST · GLOBAL READY</span><h1>Your sound.<br />Your world.<br /><em>One Musio.</em></h1><p>Fresh African sounds, independent voices, and the next big thing. Discover the music moving Uganda and beyond.</p><a className="primary-button" href="#discover">Explore music <span>→</span></a></div>
            <div className="hero-art"><div className="orbit" /><div className="orbit orbit-two" /><div className="vinyl"><div className="vinyl-center">M</div></div><span className="floating-note note-one">♪</span><span className="floating-note note-two">♫</span><div className="art-caption">SOUND WITHOUT BORDERS <b>●</b></div></div>
          </section>
          <section id="discover"><div className="section-heading"><div><span className="eyebrow">HANDPICKED FOR YOU</span><h2>On the rise <span style={{ color: "var(--lime)" }}>↗</span></h2></div><span className="demo-tag">SAMPLE CATALOG</span></div>
            <div className="genre-row">{["All", "Afrobeats", "Afro-fusion", "R&B", "Afro-pop"].map(g => <button className={genre === g ? "genre-chip chosen" : "genre-chip"} key={g} onClick={() => setGenre(g)}>{g}</button>)}</div>
            <div className="track-grid">{filtered.map(track => <article className="track-card" key={track.id}><div className={"cover cover-" + track.color}><span className="cover-number">MUSIO · 0{track.id}</span><span className="cover-symbol">{track.symbol}</span><span className="cover-word">SOUND<br />WITHOUT<br />BORDERS</span><button className="cover-play" onClick={() => { setPlaying(playing === track.id ? null : track.id); action("Demo player only — licensed audio streaming will be connected next."); }} aria-label={playing === track.id ? "Pause demo track" : "Play demo track"}>{playing === track.id ? "Ⅱ" : "▶"}</button></div><div className="track-meta"><div><h3>{track.title}</h3><p>{track.artist}</p></div><button className={liked.includes(track.id) ? "like-button liked" : "like-button"} onClick={() => setLiked(old => old.includes(track.id) ? old.filter(id => id !== track.id) : [...old, track.id])} aria-label="Like track">{liked.includes(track.id) ? "♥" : "♡"}</button></div><div className="track-genre"><span>{track.genre}</span><span>♫ {track.plays}</span></div></article>)}</div>
            {filtered.length === 0 && <div className="empty-results">No matches yet. Try a different title or genre.</div>}
          </section>
          <section className="artist-banner"><div><span className="eyebrow">LOCAL SOUND · GLOBAL STAGE</span><h2>Big talent lives here. 🇺🇬</h2><p>Are you an independent artist or label? Musio is being built to help you manage releases, understand royalties, and reach new listeners.</p></div><button className="light-button" onClick={() => selectRole("Artist")}>I make music <span>→</span></button></section>
        </>}
        <footer><a className="brand footer-brand" href="/"><span className="brand-mark">♫</span> musio<span style={{ color: "var(--lime)" }}>.</span></a><span>Built for music without borders.</span><span>Uganda · Worldwide</span></footer>
      </div>
      {notice && <div className="toast" role="status"><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Dismiss">×</button></div>}
    </main>
  );
}
