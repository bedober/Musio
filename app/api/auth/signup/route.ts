import { NextResponse } from "next/server";

import { getSupabaseAdminClient } from "@/lib/supabase";

const allowedRoles = [
  "Listener",
  "Artist",
  "Management",
  "Label",
  "Platform Admin",
] as const;

export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => null);

    const fullName = typeof payload?.fullName === "string" ? payload.fullName.trim() : "";
    const email = typeof payload?.email === "string" ? payload.email.trim().toLowerCase() : "";
    const password = typeof payload?.password === "string" ? payload.password : "";
    const role = typeof payload?.role === "string" ? payload.role.trim() : "Listener";

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    if (!allowedRoles.includes(role as (typeof allowedRoles)[number])) {
      return NextResponse.json({ error: "Unsupported role selected." }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdminClient();

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: false,
      user_metadata: {
        full_name: fullName,
        role,
      },
    });

    if (error || !data?.user) {
      return NextResponse.json(
        { error: error?.message ?? "Unable to create account." },
        { status: 400 }
      );
    }

    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .upsert(
        {
          id: data.user.id,
          full_name: fullName,
          email,
          role,
          account_status: "pending_verification",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

    if (profileError) {
      await supabaseAdmin.auth.admin.deleteUser(data.user.id).catch(() => undefined);
      return NextResponse.json(
        {
          error:
            "Account could not be created because the profile table is not configured for this project. Add the profiles schema before enabling user registration.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Account created. Please check your email to verify your account before signing in.",
      user: {
        id: data.user.id,
        email: data.user.email,
        role,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to create account right now.",
      },
      { status: 500 }
    );
  }
}
