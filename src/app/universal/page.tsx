import Hero from "@/widgets/Hero";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import FAQ from "@/widgets/FAQ";

export const metadata: Metadata = {
  title: "Zahii",
  description: "Шинэ цаг үеийн хүргэлтийн үйлчилгээ",
  openGraph: {
    type: "website",
    images: ["/branding/og.png"],
    title: "Zahii",
    description: "Шинэ цаг үеийн хүргэлтийн үйлчилгээ",
    siteName: "Zahii"
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
    "ОНЛАЙН ДЭЛГҮҮР"
  ],
  appLinks: {
    ios: {
      app_name: "Zahii",
      app_store_id: "6449288619",
      url: "zahiiapp://zahii.mn/universal"
    },
    android: {
      app_name: "zahii",
      package: "zahi.techpartners.asia",
      url: "zahiiapp://zahii.mn/universal"
    },
    web: {
      url: "https://zahii.mn"
    }
  }
};

export default function Page() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="pt-0 lg:pt-16" id="home">
          <div className="container mx-auto px-4 py-16">
            <div className="flex items-center gap-4 lg:flex-row flex-col lg:text-left text-center">
              <div className="lg:flex-1 space-y-4 flex-auto">
                <h1 className="text-gray-800 font-bold text-4xl lg:text-6xl">
                  Шинэ цаг үеийн <br />
                  <span className="text-gray-500">
                    хүргэлтийн үйлчилгээ
                  </span>{" "}
                </h1>
                <p className=" text-gray-500 text-lg lg:text-xl font-light">
                  Та аппликейшн татаж, хүргэлт хийх боломжтой 🤗 ОНЛАЙН 24/7
                </p>
              </div>
              <div className="mt-16">
                <p className="text-gray-800 font-semibold text-2xl mb-2">
                  Аппликейшин Татах
                </p>
                <div className="flex items-center gap-4">
                  <div>
                    <Image
                      src="/images/qr.png"
                      width={150}
                      height={180}
                      alt="appstore"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-4">
                    <Link href="https://apps.apple.com/us/app/zahii/id6449288619">
                      <Image
                        src="/images/app_store-min.webp"
                        width={200}
                        height={80}
                        alt="appstore"
                        className="hover:scale-105 transition-all duration-150"
                      />
                    </Link>
                    <Link href="https://play.google.com/store/apps/details?id=zahi.techpartners.asia&pli=1">
                      <Image
                        src="/images/play_store-min.webp"
                        width={200}
                        height={80}
                        alt="playstore"
                        className="hover:scale-105 transition-all duration-150"
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="py-8 lg:flex-1 flex-auto flex justify-center items-center">
                <Image
                  src={"/images/hero.webp"}
                  width={1400}
                  height={1000}
                  alt="hero"
                  priority
                  className="scale-95"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
