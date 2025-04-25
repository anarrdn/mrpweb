import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ServerAuthProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
}

/**
 * Server-side authentication component that can protect routes
 * and handle redirects based on authentication state
 */
export async function ServerAuth({
  children,
  redirectTo = "/",
  requireAuth = true,
}: ServerAuthProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const isAuthenticated = !!token;

  // Redirect if authentication doesn't match requirements
  if (requireAuth && !isAuthenticated) {
    redirect(redirectTo);
  }

  if (!requireAuth && isAuthenticated) {
    redirect("/main");
  }

  return <>{children}</>;
}
