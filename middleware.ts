import { NextRequest, NextResponse } from "next/server";

// List of allowed roles for the /dashboard route
const allowedRoles = ["superadmin", "supervisor"]; // adjust as needed

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only restrict /dashboard and its subpaths
  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("token")?.value;
    const role = request.cookies.get("role")?.value;

    if (!token || !role) {
      // If no token or role, redirect to login
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (!allowedRoles.includes(role)) {
      // If role is not allowed, redirect to unauthorized page or login
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}
