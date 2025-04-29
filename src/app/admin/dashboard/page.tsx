"use client";

import { useAuth } from "@/lib/auth/auth.context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { isAdmin, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(
      "Dashboard effect - isAdmin:",
      isAdmin,
      "isLoading:",
      isLoading,
      "user:",
      user
    );

    if (!isLoading) {
      if (!isAdmin) {
        console.log("Not an admin, redirecting to login");
        router.push("/admin/login");
      } else {
        console.log("Is admin, redirecting to users page");
        router.push("/admin/users");
      }
    } else {
      console.log("Still loading auth state");
    }
  }, [isAdmin, isLoading, router, user]);

  return null;
}
