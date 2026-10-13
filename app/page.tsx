import Link from "next/link";

const metrics = [
  { label: "Monthly listeners", value: "184K" },
  { label: "Artists onboarded", value: "1,240" },
  { label: "Premium conversion", value: "8.4%" },
];

export default function HomePage() {
  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brandWrap}>
          <div style={styles.brandMark}>M</div>
          <div>
            <div style={styles.brand}>Musio</div>
            <small style={styles.muted}>Music without borders</small>
          </div>
        </div>

        <nav style={styles.nav}>
          <Link href="/dashboard" style={styles.link}>Dashboard</Link>
          <Link href="/upload" style={styles.link}>Upload</Link>
          <Link href="/artist" style={styles.link}>Artist</Link>
          <Link href="/admin" style={styles.link}>Admin</Link>
        </nav>
      </header>

      <section style={styles.hero}>
        <div style={styles.heroCopy}>
          <span style={styles.eyebrow}>UGANDA FIRST • GLOBAL READY</span>
          <h1 style={styles.title}>Build the next music platform for Africa.</h1>
          <p style={styles.subtitle}>
            Discover tracks, support creators, manage rights, and launch premium listening
            with a modern stack designed for Vercel and Supabase.
          </p>

          <div style={styles.actions}>
            <Link href="/dashboard" style={styles.primaryButton}>Open dashboard</Link>
            <Link href="/upload" style={styles.secondaryButton}>Artist upload flow</Link>
          </div>

          <div style={styles.metricsWrap}>
            {metrics.map((metric) => (
              <div key={metric.label} style={styles.metricCard}>
                <strong style={styles.metricValue}>{metric.value}</strong>
                <span style={styles.metricLabel}>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.heroVisual}>
          <div style={styles.playerCard}>
            <div style={styles.waveRow}>
              {[32, 58, 44, 70, 48, 62, 40].map((height, index) => (
                <span
                  key={index}
                  style={{
                    ...styles.waveBar,
                    height: `${height}px`,
                    opacity: 0.35 + index * 0.08,
                  }}
                />
              ))}
            </div>
            <div style={styles.nowPlaying}>
              <span style={styles.trackTag}>Now playing</span>
              <h3 style={styles.trackTitle}>Midnight in Kampala</h3>
              <p style={styles.trackArtist}>Ayo Keys • Afrobeats</p>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.gridSection}>
        <Card title="Listener experience" text="Search tracks, build playlists, follow artists, and keep playback sticky across sessions." />
        <Card title="Artist workspace" text="Upload audio, manage performance, track earnings, and keep rights metadata complete and auditable." />
        <Card title="Admin controls" text="Approve uploads, moderate claims, and monitor content quality, payments, and account health." />
      </section>
    </main>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <article style={styles.card}>
      <div style={styles.cardIcon}>♫</div>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.cardText}>{text}</p>
    </article>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #1b233a 0%, #0c0f1b 45%, #090b12 100%)",
    color: "#edf2ff",
    fontFamily: '"Inter", sans-serif',
    padding: "32px 28px 80px",
  },
  header: {
    maxWidth: 1200,
    margin: "0 auto 42px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    flexWrap: "wrap",
  },
  brandWrap: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  brandMark: {
    width: 42,
    height: 42,
    borderRadius: 12,
    background: "linear-gradient(135deg, #8b5cf6, #22c55e)",
    display: "grid",
    placeItems: "center",
    fontWeight: 800,
  },
  brand: {
    fontSize: 30,
    fontWeight: 800,
    letterSpacing: "-0.06em",
  },
  muted: {
    color: "#a8b0c3",
  },
  nav: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },
  link: {
    color: "#dbe3ff",
    textDecoration: "none",
    padding: "10px 14px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.02)",
  },
  hero: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    gap: 32,
    alignItems: "center",
  },
  heroCopy: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  eyebrow: {
    color: "#8de9b8",
    fontWeight: 700,
    letterSpacing: "0.14em",
    fontSize: 12,
  },
  title: {
    fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
    lineHeight: 1.02,
    margin: 0,
    letterSpacing: "-0.06em",
  },
  subtitle: {
    margin: 0,
    maxWidth: 640,
    color: "#bfc9da",
    fontSize: 18,
    lineHeight: 1.7,
  },
  actions: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
  },
  primaryButton: {
    background: "linear-gradient(135deg, #8b5cf6, #22c55e)",
    color: "#fff",
    padding: "14px 22px",
    borderRadius: 999,
    textDecoration: "none",
    fontWeight: 700,
  },
  secondaryButton: {
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#edf2ff",
    padding: "14px 22px",
    borderRadius: 999,
    textDecoration: "none",
    fontWeight: 600,
    background: "rgba(255,255,255,0.04)",
  },
  metricsWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 12,
  },
  metricCard: {
    minWidth: 150,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: "18px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  metricValue: {
    fontSize: 28,
    lineHeight: 1,
  },
  metricLabel: {
    color: "#bac4d7",
    fontSize: 13,
  },
  heroVisual: {
    display: "flex",
    justifyContent: "center",
  },
  playerCard: {
    width: "100%",
    maxWidth: 430,
    borderRadius: 32,
    background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
    border: "1px solid rgba(255,255,255,0.12)",
    padding: 24,
    boxShadow: "0 24px 60px rgba(15, 23, 42, 0.45)",
  },
  waveRow: {
    display: "flex",
    alignItems: "end",
    gap: 8,
    minHeight: 130,
    padding: "10px 0 18px",
  },
  waveBar: {
    width: 12,
    borderRadius: 999,
    background: "linear-gradient(180deg, #8b5cf6, #22c55e)",
    display: "block",
  },
  nowPlaying: {
    marginTop: 8,
    paddingTop: 12,
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
  trackTag: {
    display: "inline-block",
    color: "#8de9b8",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  trackTitle: {
    margin: 0,
    fontSize: 28,
  },
  trackArtist: {
    margin: "8px 0 0",
    color: "#bfc9da",
  },
  gridSection: {
    maxWidth: 1200,
    margin: "42px auto 0",
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 20,
  },
  card: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 22,
    padding: 24,
  },
  cardIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    display: "grid",
    placeItems: "center",
    background: "rgba(139, 92, 246, 0.15)",
    color: "#d2c0ff",
    fontSize: 22,
    marginBottom: 16,
  },
  cardTitle: {
    margin: "0 0 10px",
    fontSize: 24,
  },
  cardText: {
    margin: 0,
    color: "#bfc9da",
    lineHeight: 1.7,
  },
};
