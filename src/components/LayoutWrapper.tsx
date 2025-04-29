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
  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";

  const showHeader = !isLandingPage && !isAdminPage && !isLoginPage && !isRegisterPage;

  return (
    <>
      {showHeader && <Header />}
      {showHeader && <div className="h-24" />}
      <main className={`flex-1 min-h-[calc(100vh-4rem)]${showHeader ? ' bg-gray-50' : ''}`}>{children}</main>
    </>
  );
}
