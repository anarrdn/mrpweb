"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth/auth.context";
import { apiClient } from "@/lib/api/client";
import { Button } from "@/components/ui/button";
import { DynamicEditModal } from "@/components/ui/dynamic-edit-modal";
import Image from "next/image";
import { toast } from "sonner";

interface ContentEditorProps {
  section: string;
  defaultContent: Record<string, any>;
  onContentUpdate?: (content: Record<string, any>) => void;
}

export default function ContentEditor({
  section,
  defaultContent,
  onContentUpdate,
}: ContentEditorProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<Record<string, any>>(defaultContent);
  const { isAdmin, isLoading: isAuthLoading } = useAuth();

  useEffect(() => {
    fetchContent();
  }, [section]);

  const fetchContent = async () => {
    if (!isAdmin) return;

    try {
      setIsLoading(true);
      setError(null);
      const response = await apiClient.getContent();
      if (response.data[section]) {
        setContent(response.data[section]);
      }
    } catch (error) {
      console.error(`Failed to fetch ${section} content:`, error);
      setError("Failed to fetch content");
    } finally {
      setIsLoading(false);
    }
  };

  const getValidImageUrl = (url: string | null) => {
    if (!url) return null;
    if (url.startsWith("data:image")) return url;
    if (!url.startsWith("/") && !url.startsWith("http")) return `/${url}`;
    return url;
  };

  const handleSave = async (updatedData: Record<string, any>) => {
    try {
      setError(null);
      const response = await apiClient.updateContent(section, updatedData);
      if (response.data[section]) {
        setContent(response.data[section]);
        onContentUpdate?.(response.data[section]);
      }
      setIsEditModalOpen(false);
      toast.success("Content updated successfully");
    } catch (error) {
      console.error(`Failed to save ${section} content:`, error);
      setError("Failed to save content");
      toast.error("Failed to update content");
    }
  };

  const imageUrl = content.backgroundImage
    ? getValidImageUrl(content.backgroundImage)
    : null;

  if (isLoading) {
    return <div>Loading content...</div>;
  }

  return (
    <div className="relative">
      {imageUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={imageUrl}
            alt="Background"
            fill
            className="object-cover"
            priority
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = "";
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      <div className="relative z-10">
        {!isAuthLoading && isAdmin && (
          <Button
            onClick={() => setIsEditModalOpen(true)}
            variant="outline"
            className="absolute top-4 right-4"
          >
            Edit Content
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
        onSave={handleSave}
        initialData={content}
        title={`Edit ${section} Content`}
      />
    </div>
  );
} 