import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

/**
 * Fast first check for protected pages: no session cookie → send to /signin.
 * (Pages still verify the session on the server — a cookie alone is not trusted.)
 */
export function proxy(request) {
  if (getSessionCookie(request)) return NextResponse.next();

  const url = new URL("/signin", request.url);
  url.searchParams.set("redirect", request.nextUrl.pathname);
  url.searchParams.set("reason", "protected");
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/product/:path*", "/profile/:path*"],
};