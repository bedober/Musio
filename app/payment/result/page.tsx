"use client";

import { useEffect, useState } from "react";

type PaymentState = { loading: boolean; message: string; detail?: string };

export default function PaymentResultPage() {
  const [state, setState] = useState<PaymentState>({ loading: true, message: "Verifying your payment with Pesapal…" });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const trackingId = params.get("orderTrackingId");
    if (!trackingId) {
      setState({ loading: false, message: "No payment reference was supplied.", detail: "If you just paid, return to Musio and contact support with your receipt." });
      return;
    }

    let active = true;
    fetch(`/api/payments/pesapal?orderTrackingId=${encodeURIComponent(trackingId)}`, { cache: "no-store" })
      .then(async response => {
        const body = await response.json();
        if (!response.ok) throw new Error(body.error || "Could not verify this transaction.");
        const payment = body.payment ?? {};
        const status = String(payment.payment_status_description ?? payment.status ?? "Pending");
        const confirmation = String(payment.confirmation_code ?? "");
        if (active) setState({ loading: false, message: `Pesapal status: ${status}`, detail: confirmation ? `Confirmation code: ${confirmation}` : "This status is provided by Pesapal. Musio has not yet activated paid services automatically." });
      })
      .catch(error => {
        if (active) setState({ loading: false, message: "We could not verify the payment right now.", detail: error instanceof Error ? error.message : "Please try again later." });
      });
    return () => { active = false; };
  }, []);

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "#10110f", color: "#f5f5f0" }}>
      <section style={{ width: "100%", maxWidth: 520, padding: 32, border: "1px solid #34362f", borderRadius: 20, background: "#191a17" }}>
        <a href="/" style={{ color: "#c9f36b", textDecoration: "none", fontWeight: 700 }}>♫ musio.</a>
        <h1 style={{ fontSize: 28, margin: "24px 0 12px" }}>Payment result</h1>
        <p role="status" aria-live="polite">{state.loading ? "⏳ " : "• "}{state.message}</p>
        {state.detail && <p style={{ color: "#b6b8ae", lineHeight: 1.6 }}>{state.detail}</p>}
        {state.loading && <p style={{ color: "#b6b8ae" }}>Please keep this page open while the transaction is checked.</p>}
        <a href="/" style={{ display: "inline-block", marginTop: 18, padding: "12px 16px", borderRadius: 10, background: "#c9f36b", color: "#151610", fontWeight: 700, textDecoration: "none" }}>Back to Musio</a>
      </section>
    </main>
  );
}
