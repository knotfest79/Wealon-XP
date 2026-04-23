import { NextRequest, NextResponse } from "next/server";

const xpDeepLinkPaths = new Set([
  "/about",
  "/about/team",
  "/about/story",
  "/about/testimonials",
  "/about/whyus",
  "/services",
  "/services/tax",
  "/services/bookkeeping",
  "/services/advisory",
  "/services/audit",
  "/services/smsf",
  "/services/structure",
  "/services/intltax",
  "/services/cloud",
  "/contact",
  "/book",
]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isXpSession = request.cookies.get("wealon_xp_mode")?.value === "1";

  if (isXpSession && xpDeepLinkPaths.has(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/about",
    "/about/:path*",
    "/services",
    "/services/:path*",
    "/contact",
    "/book",
  ],
};
