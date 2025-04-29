"use client";

import React from "react";
import { AuthProvider } from "@/lib/auth/auth.context";
import LayoutWrapper from "@/components/LayoutWrapper";
import Footer from "@/components/main/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <LayoutWrapper>{children}</LayoutWrapper>

    </AuthProvider>
  );
}
