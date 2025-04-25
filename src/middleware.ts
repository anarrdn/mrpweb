import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { config as appConfig } from "./lib/config";

// Define paths that don't require authentication
const PUBLIC_PATHS = [
  "/",
  "/auth/login",
  "/auth/register",
  "/api/auth/login",
  "/api/auth/register",
];

// Define paths that require admin access
const ADMIN_PATHS = ["/admin", "/api/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Get token from request
  const token = request.cookies.get("token")?.value;

  // If no token and not a public path, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    // Verify token with backend
    const response = await fetch(`${appConfig.backendUrl}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Token verification failed");
    }

    const data = await response.json();

    // Check admin access for admin paths
    if (
      ADMIN_PATHS.some((path) => pathname.startsWith(path)) &&
      data.user.role !== "admin"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Add user info to headers for downstream use
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", data.user.id);
    requestHeaders.set("x-user-role", data.user.role);

    return NextResponse.next({
      headers: requestHeaders,
    });
  } catch (error) {
    // Clear invalid token
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.delete("token");
    return response;
  }
}

// Configure paths that trigger the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/auth/* (authentication endpoints)
     * 2. /_next/* (Next.js internals)
     * 3. /fonts/* (static font files)
     * 4. /favicon.ico, /site.webmanifest (browser files)
     */
    "/((?!api/auth|_next|fonts|favicon.ico|site.webmanifest).*)",
  ],
};
