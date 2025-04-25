"use client";

import React from "react";
import { AuthProvider } from "@/lib/auth/auth.context";
import { ContentProvider } from "@/lib/content/content.context";
import LayoutWrapper from "@/components/LayoutWrapper";
import Footer from "@/components/main/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ContentProvider>
        <LayoutWrapper>{children}</LayoutWrapper>
        <Footer />
      </ContentProvider>
    </AuthProvider>
  );
}
