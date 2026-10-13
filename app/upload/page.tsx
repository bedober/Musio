import Link from "next/link";

export default function UploadPage() {
  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.topBar}>
          <div>
            <div style={styles.eyebrow}>Content library</div>
            <h1 style={styles.title}>Upload and manage audio</h1>
          </div>
          <Link href="/dashboard" style={styles.secondaryButton}>Back to dashboard</Link>
        </div>

        <div style={styles.formGrid}>
          <div style={styles.field}>
            <label style={styles.label}>Song title</label>
            <input style={styles.input} placeholder="Midnight in Kampala" />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Artist</label>
            <input style={styles.input} placeholder="Ayo Keys" />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Genre</label>
            <input style={styles.input} placeholder="Afrobeats" />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Release type</label>
            <select style={styles.input}>
              <option>Single</option>
              <option>EP</option>
              <option>Album</option>
            </select>
          </div>
        </div>

        <div style={styles.dropZone}>
          <div style={styles.dropIcon}>♫</div>
          <p style={styles.dropText}>Drag and drop audio files here or click to browse.</p>
          <small style={styles.helper}>MP3, WAV, AAC and protected delivery formats supported.</small>
        </div>

        <div style={styles.actions}>
          <button style={styles.primaryButton}>Submit for review</button>
          <button style={styles.secondaryButton}>Save draft</button>
        </div>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "radial-gradient(circle at top, #171d31, #0b1020 50%, #090d15 100%)",
    color: "#edf2ff",
    fontFamily: '"Inter", sans-serif',
    padding: 24,
  },
  card: {
    width: "min(960px, 100%)",
    background: "rgba(15, 23, 42, 0.85)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 26,
    padding: 28,
    boxShadow: "0 24px 60px rgba(15,23,42,0.4)",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 18,
    marginBottom: 24,
    flexWrap: "wrap",
  },
  eyebrow: {
    color: "#8de9b8",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  title: {
    margin: "8px 0 0",
    fontSize: "clamp(2rem, 3vw, 2.8rem)",
    letterSpacing: "-0.06em",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 18,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    fontWeight: 600,
    color: "#dfe8ff",
  },
  input: {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 12,
    padding: "12px 14px",
    color: "#edf2ff",
    fontSize: 15,
    outline: "none",
  },
  dropZone: {
    marginTop: 20,
    border: "1px dashed rgba(139,92,246,0.8)",
    background: "rgba(139,92,246,0.06)",
    borderRadius: 18,
    padding: "32px 24px",
    textAlign: "center",
  },
  dropIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  dropText: {
    margin: 0,
    fontWeight: 600,
  },
  helper: {
    display: "block",
    marginTop: 8,
    color: "#a9b7cf",
  },
  actions: {
    marginTop: 22,
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },
  primaryButton: {
    border: 0,
    background: "linear-gradient(135deg, #8b5cf6, #22c55e)",
    color: "#fff",
    padding: "12px 18px",
    borderRadius: 999,
    fontWeight: 700,
    cursor: "pointer",
  },
  secondaryButton: {
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.02)",
    color: "#edf2ff",
    padding: "12px 18px",
    borderRadius: 999,
    textDecoration: "none",
    fontWeight: 700,
    cursor: "pointer",
  },
};
