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

  const showHeader =
    !isLandingPage && !isAdminPage && !isLoginPage && !isRegisterPage;

  return (
    <div className="relative min-h-screen">
      {showHeader && (
        <>
          <Header />
          <div className="h-[140px] w-full" />
        </>
      )}
      <main className={`${showHeader ? "pt-0 bg-gray-50" : ""}`}>
        {children}
      </main>
    </div>
  );
}
