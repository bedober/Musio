import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const objectPath = body.objectPath || body.path;
  const bucket = body.bucket || process.env.STORAGE_BUCKET_NAME || "audio";

  if (!objectPath) {
    return NextResponse.json(
      { error: "Missing objectPath in request body." },
      { status: 400 }
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { error: "Supabase environment variables are not configured." },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
    },
  });

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(objectPath, 60);

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message || "Could not create signed URL." },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: data.signedUrl, bucket, objectPath });
}
