"use client";

import { useState } from "react";

export default function SignupPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Unable to create account.");
      }

      setSuccess(result?.message || "Account created successfully.");
      setForm({ fullName: "", email: "", password: "" });
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to create account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.header}>
          <div>
            <div style={styles.eyebrow}>Create account</div>
            <h1 style={styles.title}>Join Musio</h1>
          </div>
          <a href="/" style={styles.link}>Back to home</a>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.field}>
            <span style={styles.label}>Full name</span>
            <input
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Jane Doe"
              required
              style={styles.input}
            />
          </label>

          <label style={styles.field}>
            <span style={styles.label}>Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              required
              style={styles.input}
            />
          </label>

          <label style={styles.field}>
            <span style={styles.label}>Password</span>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
              required
              minLength={8}
              style={styles.input}
            />
          </label>

          <p style={styles.helper}>New accounts start as listeners. Artist, management, label, and admin access must be reviewed and granted separately.</p>

          {error ? <p style={styles.error}>{error}</p> : null}
          {success ? <p style={styles.success}>{success}</p> : null}

          <button type="submit" disabled={isSubmitting} style={styles.button}>
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "radial-gradient(circle at top, #0f172a, #090d15 55%, #050810 100%)",
    color: "#edf2ff",
    padding: 24,
    fontFamily: '"Inter", sans-serif',
  },
  card: {
    width: "min(560px, 100%)",
    background: "rgba(15, 23, 42, 0.9)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 24,
    padding: 28,
    boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 20,
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
    fontSize: "clamp(2rem, 3vw, 2.7rem)",
    letterSpacing: "-0.05em",
  },
  link: {
    color: "#dfe8ff",
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 999,
    padding: "10px 14px",
    background: "rgba(255,255,255,0.02)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    color: "#dfe8ff",
    fontWeight: 600,
  },
  input: {
    width: "100%",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.03)",
    color: "#edf2ff",
    padding: "12px 14px",
    fontSize: 16,
    boxSizing: "border-box",
  },
  button: {
    marginTop: 8,
    border: "none",
    borderRadius: 12,
    padding: "14px 18px",
    background: "linear-gradient(135deg, #8b5cf6, #22c55e)",
    color: "#fff",
    fontWeight: 800,
    cursor: "pointer",
    fontSize: 16,
  },
  helper: {
    margin: 0,
    color: "#aebbd3",
    fontSize: 14,
    lineHeight: 1.5,
  },
  error: {
    margin: 0,
    color: "#fca5a5",
    fontWeight: 600,
  },
  success: {
    margin: 0,
    color: "#86efac",
    fontWeight: 600,
  },
};
