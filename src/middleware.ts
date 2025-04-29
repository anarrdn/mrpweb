import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Define public paths that don't require authentication
const PUBLIC_PATHS = [
  "/",
  "/auth/login",
  "/auth/register",
  "/posts",
  "/menus",
  "/settings",
  "/footer",
  "/advertisements",
  "/ad-categories",
  "/transparency",
  "/reports/notifications",
  "/notifications",
  "/upload",
  "/api/login",
  "/api/register",
  "/api/posts",
  "/api/menus",
  "/api/settings",
  "/api/footer",
  "/api/advertisements",
  "/api/ad-categories",
  "/api/transparency",
  "/api/reports/notifications",
  "/api/notifications",
  "/api/upload",
  "/api/profile",
  "/admin/login",
];

// Define admin paths that require admin access
const ADMIN_PATHS = [
  "/admin",
  "/api/admin",
  "/api/users",
  "/admin/ad-categories",
  "/admin/advertisements",
  "/admin/banners",
  "/admin/password-reset",
  "/admin/password-reset-request",
  "/admin/register",
  "/admin/upload-payment-proof",
  "/admin/posts",
  "/admin/reports",
];

// Define protected paths that require authentication
const PROTECTED_PATHS = ["/api/advertisements/my", "/api/notifications"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public paths
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Get token from cookie
  const token = request.cookies.get("token")?.value;

  // Check if path requires admin access
  const isAdminPath = ADMIN_PATHS.some((path) => pathname.startsWith(path));

  // Check if path requires authentication
  const isProtectedPath = PROTECTED_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  // If no token and path requires authentication, redirect to login
  if (!token && (isProtectedPath || isAdminPath)) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If we have a token, verify it and check admin role for admin paths
  if (token) {
    try {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || "your-secret-key"
      );
      const { payload } = await jwtVerify(token, secret);

      // If it's an admin path, verify the user is an admin
      if (isAdminPath && payload.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }

      // Add user info to headers for downstream use
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", payload.user_id);
      requestHeaders.set("x-user-role", payload.role);

      return NextResponse.next({
        headers: requestHeaders,
      });
    } catch (error) {
      // Clear invalid token
      const response = NextResponse.redirect(
        new URL("/auth/login", request.url)
      );
      response.cookies.delete("token");
      return response;
    }
  }

  // For all other cases, just pass through
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
