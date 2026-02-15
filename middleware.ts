import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuth = !!token;
  const isLoginPage = req.nextUrl.pathname === "/admin";
  const isDashboard = req.nextUrl.pathname.startsWith("/admin/dashboard");

  // 1. If on login page and authenticated -> redirect to dashboard
  if (isLoginPage && isAuth) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // 2. If on dashboard (protected) and NOT authenticated -> redirect to login
  if (isDashboard && !isAuth) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
