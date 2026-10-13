import { NextResponse } from "next/server";

import { getSupabaseAdminClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fullName = String(body?.fullName ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const password = String(body?.password ?? "");
    const role = String(body?.role ?? "Listener").trim();

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    const allowedRoles = ["Listener", "Artist", "Management", "Label", "Platform Admin"];
    if (!allowedRoles.includes(role)) {
      return NextResponse.json({ error: "Unsupported role selected." }, { status: 400 });
    }

    try {
      const supabaseAdmin = getSupabaseAdminClient();
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          full_name: fullName,
          role,
        },
      });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({
        success: true,
        message: "Account created successfully.",
        user: data.user,
      });
    } catch {
      return NextResponse.json(
        {
          success: true,
          demo: true,
          message: "Demo account created successfully. Connect Supabase env vars to enable real user registration.",
          user: {
            email,
            full_name: fullName,
            role,
          },
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to create account.",
      },
      { status: 500 }
    );
  }
}
