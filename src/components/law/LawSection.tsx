"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useContent } from "@/lib/content/content.context";
import { EditButton } from "@/components/ui/edit-button";
import { DynamicEditModal } from "@/components/ui/dynamic-edit-modal";
import { Button } from "@/components/ui/button";
import { LawItem } from "@/lib/content/types";

interface LawSectionProps {
  lawItem: LawItem;
}

export function LawSection({ lawItem }: LawSectionProps) {
  const { updateLawSection } = useContent();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSave = async (updatedData: Partial<LawItem>) => {
    await updateLawSection(lawItem.id, updatedData);
    setIsEditModalOpen(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="relative">
          {lawItem.imageUrl && (
            <div className="relative w-full aspect-[16/9] mb-6 rounded-lg overflow-hidden">
              <Image
                src={lawItem.imageUrl}
                alt={lawItem.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          <div className="absolute top-4 right-4">
            <EditButton onClick={() => setIsEditModalOpen(true)} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {lawItem.title}
        </h1>
        <p className="text-lg text-gray-600 mb-8">{lawItem.description}</p>

        <div className="flex flex-col sm:flex-row gap-4">
          {lawItem.websiteLink && (
            <Button
              variant="default"
              className="w-full sm:w-auto"
              onClick={() => window.open(lawItem.websiteLink, "_blank")}
            >
              Вэбсайт руу очих
            </Button>
          )}
          {lawItem.pdfUrl && (
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => window.open(lawItem.pdfUrl, "_blank")}
            >
              PDF файл үзэх
            </Button>
          )}
        </div>

        <DynamicEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Law"
          initialData={lawItem}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
