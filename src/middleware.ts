import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("ow_token")?.value;

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forget-password" ||
    pathname === "/reset-password" ||
    pathname === "/verify-account" ||
    pathname === "/role-selection";

  if (!token && !isAuthPage) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (token && (pathname === "/" || isAuthPage || pathname === "")) {
    const url = req.nextUrl.clone();
    url.pathname = "/my-packages";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|api/|favicon.ico|images/).*)"]
};
