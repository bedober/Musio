import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const trackingId =
    request.nextUrl.searchParams.get("OrderTrackingId") ??
    request.nextUrl.searchParams.get("orderTrackingId");
  const merchantReference =
    request.nextUrl.searchParams.get("OrderMerchantReference") ??
    request.nextUrl.searchParams.get("orderMerchantReference");

  if (!trackingId) {
    return NextResponse.json({ error: "OrderTrackingId is required." }, { status: 400 });
  }

  const sandbox = (process.env.PESAPAL_ENVIRONMENT ?? "sandbox").toLowerCase() !== "live";
  const baseUrl = sandbox
    ? "https://cybqa.pesapal.com/pesapalv3"
    : "https://pay.pesapal.com/v3";
  const consumerKey = sandbox
    ? process.env.PESAPAL_SANDBOX_CONSUMER_KEY
    : process.env.PESAPAL_LIVE_CONSUMER_KEY;
  const consumerSecret = sandbox
    ? process.env.PESAPAL_SANDBOX_CONSUMER_SECRET
    : process.env.PESAPAL_LIVE_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) {
    return NextResponse.json({ error: "Pesapal credentials are not configured." }, { status: 503 });
  }

  try {
    const auth = await fetch(`${baseUrl}/api/Auth/RequestToken`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ consumer_key: consumerKey, consumer_secret: consumerSecret }),
      cache: "no-store",
    });
    const authData = (await auth.json().catch(() => ({}))) as { token?: string };
    if (!auth.ok || !authData.token) {
      return NextResponse.json({ error: "Pesapal authentication failed." }, { status: 502 });
    }

    const statusUrl = new URL(`${baseUrl}/api/Transactions/GetTransactionStatus`);
    statusUrl.searchParams.set("orderTrackingId", trackingId);
    const statusResponse = await fetch(statusUrl, {
      headers: { Authorization: `Bearer ${authData.token}`, Accept: "application/json" },
      cache: "no-store",
    });
    const statusData = await statusResponse.json().catch(() => ({}));
    if (!statusResponse.ok) {
      return NextResponse.json({ error: "Could not verify the Pesapal transaction." }, { status: 502 });
    }

    // Provider status is verified here, but persistence/idempotent fulfilment requires a configured order database.
    return NextResponse.json({ received: true, merchantReference, transaction: statusData });
  } catch {
    return NextResponse.json({ error: "Pesapal IPN verification failed." }, { status: 502 });
  }
}
