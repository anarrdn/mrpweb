"use client";

import Footer from "@/components/main/Footer";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import ClientLayout from "@/components/ClientLayout";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/client";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [siteTitle, setSiteTitle] = useState("MRP Medtech");
  const [siteDescription, setSiteDescription] = useState(
    "Монголын Ромын Пап байгууллагын албан ёсны вэбсайт"
  );
  const pathname = usePathname();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await apiClient.getSettings();
        const titleSetting = settings.find((s) => s.key === "site_title");
        const descSetting = settings.find((s) => s.key === "site_description");

        if (titleSetting?.value) setSiteTitle(titleSetting.value);
        if (descSetting?.value) setSiteDescription(descSetting.value);
      } catch (err) {
        console.error("Failed to fetch site settings:", err);
      }
    };

    fetchSettings();
  }, []);

  return (
    <html lang="mn">
      <head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:site_name" content={siteTitle} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <ClientLayout>
          {children}
          {pathname !== "/" && pathname !== "/login" && pathname !== "/register" && <Footer />}
        </ClientLayout>
        <Toaster />
      </body>
    </html>
  );
}
