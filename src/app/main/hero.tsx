"use client";

import Image from "next/image";

interface HeroProps {
  content: {
    title?: string;
    subtitle?: string;
    backgroundImage?: string;
  };
}

export default function Hero({ content }: HeroProps) {
  const getValidImageUrl = (url: string | null) => {
    if (!url) return null;
    if (url.startsWith("data:image")) return url;
    if (!url.startsWith("/") && !url.startsWith("http")) return `/${url}`;
    return url;
  };

  const imageUrl = content?.backgroundImage
    ? getValidImageUrl(content.backgroundImage)
    : null;

  return (
    <div className="relative h-screen w-full">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Hero background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      )}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="text-center text-white max-w-3xl px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {content?.title || "Welcome to Medtech MRP"}
          </h1>
          <p className="text-xl md:text-2xl">
            {content?.subtitle || "Your Medical Resource Planning Solution"}
          </p>
        </div>
      </div>
    </div>
  );
}
