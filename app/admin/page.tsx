import Link from "next/link";

const queue = [
  { title: "Midnight in Kampala", artist: "Ayo Keys", duration: "03:18" },
  { title: "Golden Hour", artist: "Nia Rose", duration: "03:02" },
  { title: "Closer to Home", artist: "The Nile", duration: "02:55" },
];

export default function AdminPage() {
  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <header style={styles.header}>
          <div>
            <div style={styles.eyebrow}>Admin</div>
            <h1 style={styles.title}>Moderation and operations</h1>
          </div>
          <Link href="/dashboard" style={styles.secondaryButton}>Back to dashboard</Link>
        </header>

        <div style={styles.grid}>
          <div style={styles.panel}>
            <h3 style={styles.panelTitle}>Pending review</h3>
            <div style={styles.list}>
              <ReviewItem title="Sabrina T - Nkwatako" score="Needs rights check" />
              <ReviewItem title="Lwazi - City Lights" score="Audio quality warning" />
              <ReviewItem title="Mimi Z - Dusk" score="Awaiting metadata" />
            </div>
          </div>

          <div style={styles.panel}>
            <h3 style={styles.panelTitle}>Live queue</h3>
            {queue.map((track) => (
              <div key={track.title} style={styles.row}>
                <div>
                  <strong>{track.title}</strong>
                  <div style={styles.meta}>{track.artist}</div>
                </div>
                <span style={styles.duration}>{track.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ReviewItem({ title, score }: { title: string; score: string }) {
  return (
    <div style={styles.reviewItem}>
      <div>
        <strong>{title}</strong>
        <div style={styles.meta}>{score}</div>
      </div>
      <button style={styles.ghostButton}>Review</button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: 24,
    background: "radial-gradient(circle at top, #121a2b, #090d15 57%, #070b12 100%)",
    color: "#edf2ff",
    fontFamily: '"Inter", sans-serif',
  },
  card: {
    width: "min(960px, 100%)",
    background: "rgba(15, 23, 42, 0.85)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 26,
    padding: 28,
    boxShadow: "0 24px 60px rgba(15,23,42,0.36)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 18,
    marginBottom: 20,
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
    fontSize: "clamp(2rem, 3vw, 3rem)",
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
  grid: {
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: 18,
  },
  panel: {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 18,
    padding: 20,
  },
  panelTitle: {
    margin: "0 0 16px",
    fontSize: 22,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  reviewItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    borderRadius: 12,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.04)",
    padding: 12,
  },
  meta: {
    color: "#9aa7bf",
    fontSize: 12,
    marginTop: 4,
  },
  ghostButton: {
    border: "1px solid rgba(139,92,246,0.5)",
    background: "rgba(139,92,246,0.08)",
    color: "#d9cbff",
    borderRadius: 999,
    padding: "8px 12px",
    cursor: "pointer",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    borderRadius: 12,
    background: "rgba(255,255,255,0.03)",
    padding: 12,
    marginBottom: 10,
  },
  duration: {
    color: "#8de9b8",
    fontWeight: 700,
  },
};
