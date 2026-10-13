import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

const navItems = [
  { href: "/", label: "Overview", roles: ["Listener", "Artist", "Management", "Label", "Platform Admin"] },
  { href: "/dashboard", label: "Dashboard", roles: ["Listener", "Artist", "Management", "Label", "Platform Admin"] },
  { href: "/upload", label: "Uploads", roles: ["Artist", "Management", "Label", "Platform Admin"] },
  { href: "/artist", label: "Artist", roles: ["Artist", "Management", "Label", "Platform Admin"] },
  { href: "/admin", label: "Admin", roles: ["Platform Admin"] },
];

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/dashboard");
  const { data: profile } = await supabase.from("profiles").select("full_name, role, account_status").eq("id", user.id).maybeSingle();

  return (
    <main style={styles.page}>
      <aside style={styles.sidebar}>
        <div style={styles.brandRow}>
          <div style={styles.brandMark}>M</div>
          <div>
            <div style={styles.brand}>Musio</div>
            <small style={styles.muted}>Creator dashboard</small>
          </div>
        </div>

        <nav style={styles.navWrap}>
          {navItems.filter((item) => item.roles.includes(profile?.role || "Listener")).map((item) => (
            <Link key={item.href} href={item.href} style={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={styles.cardMini}>
          <div style={styles.avatar}>BP</div>
          <div>
            <strong>{profile?.full_name || user.email || "Welcome back"}</strong>
            <div style={styles.muted}>{profile?.role || "Listener"} workspace</div>
            <LogoutButton />
          </div>
        </div>
      </aside>

      <section style={styles.content}>
        <header style={styles.header}>
          <div>
            <div style={styles.eyebrow}>Overview</div>
            <h1 style={styles.title}>Music platform performance</h1>
          </div>
          <button style={styles.primaryButton}>New release</button>
        </header>

        <div style={styles.statGrid}>
          <StatCard label="Daily streams" value="88,420" trend="+12.6%" />
          <StatCard label="Active listeners" value="36,480" trend="+7.2%" />
          <StatCard label="Revenue" value="$14,200" trend="+4.8%" />
          <StatCard label="Pending moderation" value="12" trend="3 urgent" />
        </div>

        <div style={styles.panelGrid}>
          <div style={styles.panelLarge}>
            <h3 style={styles.panelTitle}>Top-performing tracks</h3>
            <ul style={styles.list}>
              <ListRow title="Midnight in Kampala" meta="Ayo Keys • 18.2K plays" />
              <ListRow title="Golden Hour" meta="Nia Rose • 12.4K plays" />
              <ListRow title="Closer to Home" meta="The Nile • 10.8K plays" />
            </ul>
          </div>

          <div style={styles.panel}>
            <h3 style={styles.panelTitle}>Revenue mix</h3>
            <div style={styles.pieWrap}>
              <div style={styles.pie} />
              <div style={styles.legend}>
                <LegendRow label="Premium" value="45%" color="#8b5cf6" />
                <LegendRow label="Ads" value="30%" color="#22c55e" />
                <LegendRow label="Artist services" value="25%" color="#f59e0b" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value, trend }: { label: string; value: string; trend: string }) {
  return (
    <div style={styles.statCard}>
      <span style={styles.statLabel}>{label}</span>
      <strong style={styles.statValue}>{value}</strong>
      <span style={styles.trend}>{trend}</span>
    </div>
  );
}

function ListRow({ title, meta }: { title: string; meta: string }) {
  return (
    <li style={styles.listItem}>
      <div>
        <strong>{title}</strong>
        <div style={styles.meta}>{meta}</div>
      </div>
      <span style={styles.badge}>Trending</span>
    </li>
  );
}

function LegendRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={styles.legendRow}>
      <span style={{ ...styles.dot, background: color }} />
      <span>{label}</span>
      <strong style={{ marginLeft: "auto" }}>{value}</strong>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    background: "#0b1020",
    color: "#edf2ff",
    fontFamily: '"Inter", sans-serif',
  },
  sidebar: {
    width: 260,
    background: "rgba(15, 23, 42, 0.95)",
    borderRight: "1px solid rgba(255,255,255,0.08)",
    padding: 28,
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  brandRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
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
    fontSize: 26,
    fontWeight: 800,
  },
  muted: {
    color: "#9aa7bf",
  },
  navWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  navLink: {
    color: "#edf2ff",
    textDecoration: "none",
    padding: "10px 12px",
    borderRadius: 10,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.04)",
  },
  cardMini: {
    marginTop: "auto",
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 14,
    background: "rgba(255,255,255,0.03)",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    background: "linear-gradient(135deg, #f59e0b, #ef4444)",
    fontWeight: 700,
  },
  content: {
    flex: 1,
    padding: 32,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
    flexWrap: "wrap",
  },
  eyebrow: {
    color: "#8de9b8",
    fontWeight: 700,
    letterSpacing: "0.12em",
    fontSize: 12,
    textTransform: "uppercase",
  },
  title: {
    margin: "8px 0 0",
    fontSize: "clamp(2rem, 3vw, 3rem)",
    letterSpacing: "-0.05em",
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
  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 18,
    marginBottom: 24,
  },
  statCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 18,
    padding: 22,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  statLabel: {
    color: "#bac4d7",
    fontSize: 13,
  },
  statValue: {
    fontSize: 30,
    lineHeight: 1.1,
  },
  trend: {
    color: "#8de9b8",
    fontWeight: 700,
  },
  panelGrid: {
    display: "grid",
    gridTemplateColumns: "1.3fr 0.7fr",
    gap: 18,
  },
  panelLarge: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 18,
    padding: 20,
  },
  panel: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 18,
    padding: 20,
  },
  panelTitle: {
    margin: "0 0 18px",
    fontSize: 20,
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgba(255,255,255,0.02)",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.04)",
    padding: 12,
  },
  meta: {
    color: "#9aa7bf",
    marginTop: 4,
    fontSize: 12,
  },
  badge: {
    background: "rgba(34,197,94,0.13)",
    color: "#8de9b8",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    padding: "6px 10px",
  },
  pieWrap: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  pie: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    background: "conic-gradient(#8b5cf6 0 45%, #22c55e 45% 75%, #f59e0b 75% 100%)",
  },
  legend: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    flex: 1,
  },
  legendRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "#dfe8ff",
    fontSize: 14,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    display: "inline-block",
  },
};
