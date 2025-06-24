import { NextRequest, NextResponse } from "next/server";

const allowedRoutes: Record<string, string[]> = {
  superadmin: ["/users", "/models", "/projects"],
  supervisor: ["/users", "/models", "/projects"],
  user: ["/projects"]
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  if (pathname.startsWith("/dashboard")) {
    if (!token || !role) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const routes = allowedRoutes[role];

    if (!routes) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    const hasAccess = routes.some(
      (route) =>
        pathname === "/dashboard" || pathname.startsWith(`/dashboard${route}`)
    );

    if (!hasAccess) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    if (token || role) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}
