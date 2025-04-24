import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get token from cookies
  const token = request.cookies.get("token")?.value;

  // Only redirect to home if trying to access admin routes without admin token
  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    (!token || !request.cookies.get("user")?.value)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow access to all other routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
