import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const trackingId =
    request.nextUrl.searchParams.get("OrderTrackingId") ??
    request.nextUrl.searchParams.get("orderTrackingId");

  const resultUrl = new URL("/payment/result", request.nextUrl.origin);
  if (trackingId) resultUrl.searchParams.set("orderTrackingId", trackingId);
  resultUrl.searchParams.set("provider", "pesapal");
  return NextResponse.redirect(resultUrl);
}
