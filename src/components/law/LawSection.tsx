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
    <section className="py-24 bg-white pt-40 scroll-mt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {lawItem.title}
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {lawItem.imageUrl && (
              <div className="relative w-full aspect-[16/9] mb-8 rounded-2xl overflow-hidden shadow-lg">
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

          <p className="text-lg text-gray-600 leading-relaxed mb-12">
            {lawItem.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {lawItem.websiteLink && (
              <Button
                variant="default"
                className="w-full sm:w-auto px-6 py-3 text-lg"
                onClick={() => window.open(lawItem.websiteLink, "_blank")}
              >
                Вэбсайт руу очих
              </Button>
            )}
            {lawItem.pdfUrl && (
              <Button
                variant="outline"
                className="w-full sm:w-auto px-6 py-3 text-lg"
                onClick={() => window.open(lawItem.pdfUrl, "_blank")}
              >
                PDF файл үзэх
              </Button>
            )}
          </div>
        </div>

        <DynamicEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Law"
          initialData={lawItem}
          onSave={handleSave}
        />
      </div>
    </section>
  );
}
