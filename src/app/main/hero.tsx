"use client";

import { DynamicEditModal } from "@/components/ui/dynamic-edit-modal";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/auth.context";
import { apiClient } from "@/lib/api/client";

export default function Hero() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<Record<string, any>>({
    title: "Welcome to Medtech MRP",
    subtitle: "Your Medical Resource Planning Solution",
    backgroundImage: null,
  });
  const { isAdmin, isLoading: isAuthLoading } = useAuth();

  const fetchContent = useCallback(async () => {
    if (!isAdmin) return; // Only fetch content if admin

    try {
      setIsLoading(true);
      setError(null);
      const response = await apiClient.getContent();
      if (response.data.hero) {
        setContent(response.data.hero);
      }
    } catch (error) {
      console.error("Failed to fetch hero content:", error);
      setError("Failed to fetch content");
      // Keep the default content on error
    } finally {
      setIsLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const getValidImageUrl = (url: string | null) => {
    if (!url) return null;
    if (url.startsWith("data:image")) return url;
    if (!url.startsWith("/") && !url.startsWith("http")) return `/${url}`;
    return url;
  };

  const handleSave = async (updatedData: Record<string, any>) => {
    try {
      setError(null);
      const response = await apiClient.updateContent("hero", updatedData);
      if (response.data.hero) {
        setContent(response.data.hero);
      }
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to save hero content:", error);
      setError("Failed to save content");
    }
  };

  const imageUrl = getValidImageUrl(content.backgroundImage);

  // Show default content while loading or on error
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white">
      <div className="absolute inset-0 z-0">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Background"
            fill
            className="object-cover"
            priority
            onError={(e) => {
              // Handle image load error by removing src
              const img = e.target as HTMLImageElement;
              img.src = "";
            }}
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {content.title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          {content.subtitle}
        </p>
        {!isAuthLoading && isAdmin && (
          <Button
            onClick={() => setIsEditModalOpen(true)}
            variant="outline"
            className="absolute top-4 right-4"
          >
            Edit Hero
          </Button>
        )}
        {error && (
          <p className="text-red-500 bg-white/10 px-4 py-2 rounded absolute bottom-4 left-1/2 transform -translate-x-1/2">
            {error}
          </p>
        )}
      </div>

      <DynamicEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Hero Section"
        initialData={content}
        onSave={handleSave}
      />
    </section>
  );
}

// export const Hero = async  ()=> {

//     const data = await Hero.info()

//     return (
//         <div>
//             {data.title}
//             {data.sub_title}
//         </div>
//     )
// }
