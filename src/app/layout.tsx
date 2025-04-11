import Footer from "@/components/main/Footer";
import Header from "@/components/main/Header";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const gipSans = localFont({
  src: [
    {
      path: "./fonts/GIP-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/GIP-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/GIP-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/GIP-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/GIP-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/GIP-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/GIP-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-gip-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Zahii",
  description: "Шинэ цаг үеийн хүргэлтийн үйлчилгээ",
  openGraph: {
    type: "website",
    images: ["/branding/og.png"],
    title: "Zahii",
    description: "Шинэ цаг үеийн хүргэлтийн үйлчилгээ",
    siteName: "Zahii",
  },
  robots: { index: true, follow: true },

  keywords: [
    "zahii",
    "zahii app",
    "zahii delivery",
    "zahii delivery app",
    "zahii delivery service",
    "zahii delivery mongolia",
    "zahii delivery app mongolia",
    "zahii delivery service mongolia",
    "zahii delivery service app",
    "Захий",
    "захий апп",
    "захий хүргэлт",
    "захий хүргэлт апп",
    "захий хүргэлт үйлчилгээ",
    "захий хүргэлт монгол",
    "захий хүргэлт апп монгол",
    "захий хүргэлт үйлчилгээ монгол",
    "хүргэлт үйлчилгээ",
    "хүргэлт үйлчилгээ апп",
    "хүргэлт",
    "Шинэ цаг үеийн хүргэлтийн үйлчилгээ 🤗 ОНЛАЙН 24/7 ДЭЛГҮҮР",
    "ОНЛАЙН 24/7 ДЭЛГҮҮР",
    "ОНЛАЙН ДЭЛГҮҮР",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
      <body
        className={`${gipSans.variable} antialiased relative overflow-x-hidden bg-[#F1F1F1] min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1 min-h-[calc(100vh-4rem)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
