import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin") || pathname.startsWith("/artist") || pathname.startsWith("/upload")) {
    const hasSession = request.cookies.get("sb-access-token") || request.cookies.getAll().some(({ name }) => name.includes("-auth-token"));
    if (!hasSession) return NextResponse.redirect(new URL("/login?next=" + encodeURIComponent(pathname), request.url));
  }

  return response;
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
