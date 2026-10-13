import { NextResponse } from "next/server";

import { getSupabaseAdminClient, getSupabaseClient } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => null);

    const fullName = typeof payload?.fullName === "string" ? payload.fullName.trim() : "";
    const email = typeof payload?.email === "string" ? payload.email.trim().toLowerCase() : "";
    const password = typeof payload?.password === "string" ? payload.password : "";

    if (!fullName || fullName.length > 120 || !email || !password) {
      return NextResponse.json(
        { error: "Enter your name, a valid email, and a password." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    if (password.length < 12 || password.length > 128) {
      return NextResponse.json(
        { error: "Use a password between 12 and 128 characters." },
        { status: 400 }
      );
    }

    // Public signup sends Supabase's configured email-confirmation message.
    // Never let the request body choose a privileged role.
    const supabase = getSupabaseClient();
    const supabaseAdmin = getSupabaseAdminClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
          `${new URL(request.url).origin}/auth/callback`,
        data: { full_name: fullName, role: "Listener" },
      },
    });

    if (error || !data.user) {
      // Avoid returning provider details that could reveal account or infrastructure state.
      console.warn("Musio signup rejected", error?.status ?? "unknown");
      return NextResponse.json(
        { error: "We could not create the account. Check the details or try again later." },
        { status: 400 }
      );
    }

    const { error: profileError } = await supabaseAdmin.from("profiles").upsert(
      {
        id: data.user.id,
        full_name: fullName,
        email,
        role: "Listener",
        account_status: "pending_verification",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );

    if (profileError) {
      console.error("Musio profile provisioning failed", profileError.code ?? "unknown");
      await supabaseAdmin.auth.admin.deleteUser(data.user.id).catch(() => undefined);
      return NextResponse.json(
        { error: "Account setup is temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Account created. Check your email for a verification link before signing in.",
      user: { id: data.user.id, email: data.user.email, role: "Listener" },
    });
  } catch (error) {
    console.error("Musio signup service error", error instanceof Error ? error.message : "unknown");
    return NextResponse.json(
      { error: "Account creation is temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }
}
