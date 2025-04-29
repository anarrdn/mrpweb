"use client";

import React from "react";
import Header from "./main/Header";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/" || pathname === "/landing";
  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <>
      {!isLandingPage && !isAdminPage && <Header />}
      <main className="flex-1 min-h-[calc(100vh-4rem)]">{children}</main>
    </>
  );
}
