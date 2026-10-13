import Link from "next/link";

const stats = [
  { label: "Followers", value: "84.3K" },
  { label: "Monthly listeners", value: "24.5K" },
  { label: "Avg. stream time", value: "3m 42s" },
  { label: "Earnings", value: "$1,280" },
];

export default function ArtistPage() {
  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <header style={styles.header}>
          <div>
            <div style={styles.eyebrow}>Artist workspace</div>
            <h1 style={styles.title}>Ayo Keys</h1>
          </div>
          <Link href="/dashboard" style={styles.secondaryButton}>Back to dashboard</Link>
        </header>

        <div style={styles.heroPanel}>
          <div style={styles.profileBadge}>AK</div>
          <div>
            <h2 style={styles.subTitle}>Artist profile</h2>
            <p style={styles.text}>Afrobeats • Kampala • 4 releases this year</p>
          </div>
        </div>

        <div style={styles.statGrid}>
          {stats.map((item) => (
            <div key={item.label} style={styles.statCard}>
              <span style={styles.statLabel}>{item.label}</span>
              <strong style={styles.statValue}>{item.value}</strong>
            </div>
          ))}
        </div>

        <div style={styles.trackList}>
          <TrackRow title="Midnight in Kampala" plays="18.2K" status="Live" />
          <TrackRow title="Golden Hour" plays="12.4K" status="Reviewing" />
          <TrackRow title="Closer to Home" plays="10.8K" status="Scheduled" />
        </div>
      </section>
    </main>
  );
}

function TrackRow({ title, plays, status }: { title: string; plays: string; status: string }) {
  return (
    <div style={styles.trackRow}>
      <div>
        <strong>{title}</strong>
        <div style={styles.meta}>{plays} plays</div>
      </div>
      <span style={styles.status}>{status}</span>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: 24,
    background: "radial-gradient(circle at top, #1d2030, #0a0f1a 48%, #070b12 100%)",
    color: "#edf2ff",
    fontFamily: '"Inter", sans-serif',
  },
  card: {
    width: "min(980px, 100%)",
    background: "rgba(15, 23, 42, 0.85)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 28,
    padding: 28,
    boxShadow: "0 24px 60px rgba(15,23,42,0.38)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 18,
    marginBottom: 22,
    flexWrap: "wrap",
  },
  eyebrow: {
    color: "#8de9b8",
    fontSize: 12,
    letterSpacing: "0.12em",
    fontWeight: 700,
    textTransform: "uppercase",
  },
  title: {
    margin: "8px 0 0",
    fontSize: "clamp(2.1rem, 4vw, 3rem)",
    letterSpacing: "-0.06em",
  },
  secondaryButton: {
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.02)",
    color: "#edf2ff",
    padding: "12px 18px",
    borderRadius: 999,
    textDecoration: "none",
    fontWeight: 700,
  },
  heroPanel: {
    marginTop: 18,
    display: "flex",
    alignItems: "center",
    gap: 18,
    background: "rgba(255,255,255,0.03)",
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.05)",
    padding: 18,
  },
  profileBadge: {
    width: 60,
    height: 60,
    borderRadius: 18,
    background: "linear-gradient(135deg, #8b5cf6, #22c55e)",
    display: "grid",
    placeItems: "center",
    fontWeight: 800,
    fontSize: 22,
  },
  subTitle: {
    margin: 0,
    fontSize: 28,
  },
  text: {
    margin: "6px 0 0",
    color: "#bac4d7",
  },
  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 16,
    marginTop: 22,
  },
  statCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: 18,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  statLabel: {
    color: "#bac4d7",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  statValue: {
    fontSize: 28,
    lineHeight: 1.1,
  },
  trackList: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  trackRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 18,
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.05)",
    borderRadius: 14,
    padding: 14,
  },
  meta: {
    marginTop: 4,
    color: "#9aa7bf",
    fontSize: 12,
  },
  status: {
    borderRadius: 999,
    background: "rgba(34,197,94,0.12)",
    color: "#8de9b8",
    fontWeight: 700,
    padding: "6px 10px",
    fontSize: 12,
  },
};
