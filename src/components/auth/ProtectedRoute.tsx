"use client";

import { useAuth } from "@/lib/auth/auth.context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    console.log("ProtectedRoute mounted");
    console.log("Auth state:", { isAuthenticated, user, isLoading });

    if (!isLoading) {
      if (!isAuthenticated) {
        console.log("User not authenticated");
        setIsChecking(false);
      } else if (requireAdmin && user?.role !== "admin") {
        console.log("User not admin, redirecting to home");
        router.push("/");
      } else {
        console.log("Access granted");
        setIsChecking(false);
      }
    }
  }, [isAuthenticated, user, isLoading, requireAdmin, router]);

  if (isLoading || isChecking) {
    console.log("Loading state, showing loading...");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || (requireAdmin && user?.role !== "admin")) {
    console.log("Access denied, returning null");
    return null;
  }

  console.log("Rendering protected content");
  return <>{children}</>;
}
