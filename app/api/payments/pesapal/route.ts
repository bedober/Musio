import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SANDBOX_URL = "https://cybqa.pesapal.com/pesapalv3";
const LIVE_URL = "https://pay.pesapal.com/v3";

function config() {
  const mode = (process.env.PESAPAL_ENVIRONMENT ?? "sandbox").toLowerCase();
  const sandbox = mode !== "live";
  const baseUrl = sandbox ? SANDBOX_URL : LIVE_URL;
  const consumerKey = sandbox
    ? process.env.PESAPAL_SANDBOX_CONSUMER_KEY
    : process.env.PESAPAL_LIVE_CONSUMER_KEY;
  const consumerSecret = sandbox
    ? process.env.PESAPAL_SANDBOX_CONSUMER_SECRET
    : process.env.PESAPAL_LIVE_CONSUMER_SECRET;
  const ipnId = sandbox
    ? process.env.PESAPAL_SANDBOX_IPN_ID
    : process.env.PESAPAL_LIVE_IPN_ID;

  if (!consumerKey || !consumerSecret || !ipnId) {
    throw new Error(
      `Pesapal ${sandbox ? "sandbox" : "live"} credentials are incomplete. Configure the matching Consumer Key, Consumer Secret, and IPN ID.`,
    );
  }

  return { baseUrl, consumerKey, consumerSecret, ipnId, sandbox };
}

async function getToken(settings: ReturnType<typeof config>) {
  const response = await fetch(`${settings.baseUrl}/api/Auth/RequestToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      consumer_key: settings.consumerKey,
      consumer_secret: settings.consumerSecret,
    }),
    cache: "no-store",
  });
  const data = (await response.json().catch(() => ({}))) as {
    token?: string;
    error?: string;
    message?: string;
  };

  if (!response.ok || !data.token) {
    throw new Error(data.message || data.error || "Pesapal authentication failed.");
  }
  return data.token;
}

export async function POST(request: NextRequest) {
  try {
    const settings = config();
    const body = (await request.json()) as {
      amount?: number;
      currency?: string;
      description?: string;
      email?: string;
      phoneNumber?: string;
      firstName?: string;
      lastName?: string;
      city?: string;
      countryCode?: string;
    };

    const amount = Number(body.amount);
    const currency = String(body.currency ?? "UGX").toUpperCase();
    const description = String(body.description ?? "Musio artist services").trim();
    const email = String(body.email ?? "").trim();
    const phoneNumber = String(body.phoneNumber ?? "").trim();
    const firstName = String(body.firstName ?? "Musio").trim();
    const lastName = String(body.lastName ?? "Customer").trim();

    if (!Number.isFinite(amount) || amount <= 0 || amount > 100000000) {
      return NextResponse.json({ error: "Enter a valid payment amount." }, { status: 400 });
    }
    if (!["UGX", "USD", "KES", "TZS", "RWF"].includes(currency)) {
      return NextResponse.json({ error: "Unsupported currency." }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid customer email is required." }, { status: 400 });
    }
    if (description.length < 3 || description.length > 100) {
      return NextResponse.json({ error: "Description must be 3–100 characters." }, { status: 400 });
    }

    const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? "").replace(/\/$/, "");
    if (!appUrl || !appUrl.startsWith("https://") && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Set NEXT_PUBLIC_APP_URL to the deployed HTTPS Musio URL." }, { status: 500 });
    }
    const origin = request.headers.get("origin");
    if (origin && appUrl && new URL(origin).host !== new URL(appUrl).host) {
      return NextResponse.json({ error: "Request origin is not allowed." }, { status: 403 });
    }

    const token = await getToken(settings);
    const reference = `MUSIO-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
    const order = {
      id: reference,
      currency,
      amount: Math.round(amount * 100) / 100,
      description,
      callback_url: `${appUrl}/api/payments/pesapal/callback`,
      notification_id: settings.ipnId,
      billing_address: {
        email_address: email,
        phone_number: phoneNumber,
        country_code: String(body.countryCode ?? "UG").toUpperCase().slice(0, 2),
        first_name: firstName.slice(0, 50),
        last_name: lastName.slice(0, 50),
        city: String(body.city ?? "Kampala").slice(0, 50),
      },
    };

    const response = await fetch(`${settings.baseUrl}/api/Transactions/SubmitOrderRequest`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(order),
      cache: "no-store",
    });
    const result = (await response.json().catch(() => ({}))) as {
      redirect_url?: string;
      order_tracking_id?: string;
      error?: string;
      message?: string;
      status?: string;
    };

    if (!response.ok || !result.redirect_url || !result.order_tracking_id) {
      return NextResponse.json(
        { error: result.message || result.error || "Pesapal could not create the payment order." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      redirectUrl: result.redirect_url,
      orderTrackingId: result.order_tracking_id,
      merchantReference: reference,
      environment: settings.sandbox ? "sandbox" : "live",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to initialize Pesapal payment.";
    const status = message.includes("credentials are incomplete") ? 503 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function GET(request: NextRequest) {
  const trackingId = request.nextUrl.searchParams.get("orderTrackingId");
  if (!trackingId || trackingId.length > 200) {
    return NextResponse.json({ error: "orderTrackingId is required." }, { status: 400 });
  }

  try {
    const settings = config();
    const token = await getToken(settings);
    const url = new URL(`${settings.baseUrl}/api/Transactions/GetTransactionStatus`);
    url.searchParams.set("orderTrackingId", trackingId);

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      cache: "no-store",
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return NextResponse.json({ error: "Could not verify payment status with Pesapal." }, { status: 502 });
    }
    return NextResponse.json({ payment: data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to verify payment.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
