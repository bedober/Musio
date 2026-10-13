"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setError("");
    const { error: signInError } = await createClient().auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
    setPending(false);
    if (signInError) {
      setError(signInError.message.toLowerCase().includes("confirm") ? "Please verify your email before signing in." : "Invalid email or password.");
      return;
    }
    const next = new URLSearchParams(window.location.search).get("next");
    router.replace(next?.startsWith("/") ? next : "/dashboard");
    router.refresh();
  }

  return <main className="auth-page"><section className="auth-card"><Link href="/" className="brand">musio<span>.</span></Link><span className="eyebrow">WELCOME BACK</span><h1>Sign in to Musio.</h1><p className="auth-copy">Access your music workspace, releases, and audience insights.</p><form onSubmit={handleSubmit} className="auth-form"><label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" /></label><label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" /></label>{error && <p className="auth-error" role="alert">{error}</p>}<button className="primary-button" disabled={pending}>{pending ? "Signing in…" : "Sign in"}<span>→</span></button></form><p className="auth-switch">New to Musio? <Link href="/signup">Create an account</Link></p></section></main>;
}
