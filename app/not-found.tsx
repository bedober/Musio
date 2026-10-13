import Link from "next/link";

export default function NotFound() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <span className="eyebrow">404</span>
        <h1>Page not found.</h1>
        <p className="auth-copy">The page you are looking for does not exist or has moved.</p>
        <Link className="primary-button" href="/">Return home <span>→</span></Link>
      </section>
    </main>
  );
}
