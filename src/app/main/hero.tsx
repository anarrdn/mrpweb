"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/api/client";
import { Content } from "@/lib/api/types";

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<Record<string, any>>({
    title: "Welcome to Medtech MRP",
    subtitle: "Your Medical Resource Planning Solution",
    backgroundImage: null,
  });

  const fetchContent = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiClient.getContent();
      if (response && response.hero) {
        setContent({
          title: response.hero.title || "Welcome to Medtech MRP",
          subtitle:
            response.hero.subtitle || "Your Medical Resource Planning Solution",
          backgroundImage: response.hero.backgroundImage || null,
        });
      }
    } catch (error) {
      console.error("Failed to fetch hero content:", error);
      // Silently handle the error without setting any state
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const getValidImageUrl = (url: string | null) => {
    if (!url) return null;
    if (url.startsWith("data:image")) return url;
    if (!url.startsWith("/") && !url.startsWith("http")) return `/${url}`;
    return url;
  };

  const imageUrl = getValidImageUrl(content.backgroundImage);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/branding/consultation.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {content?.title || "Welcome to Medtech MRP"}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          {content?.subtitle || "Your Medical Resource Planning Solution"}
        </p>
      </div>
    </section>
  );
}
