"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useContent } from "@/lib/content/content.context";
import { EditButton } from "@/components/ui/edit-button";
import { DynamicEditModal } from "@/components/ui/dynamic-edit-modal";
import { Button } from "@/components/ui/button";
import { LawItem } from "@/lib/content/types";
import { useRouter } from "next/navigation";

interface LawSectionProps {
  lawItem: LawItem;
}

export function LawSection({ lawItem }: LawSectionProps) {
  const { updateLawSection } = useContent();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

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
    <section className="py-24 bg-white pt-40">
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
              <div className="relative w-full mb-8 rounded-2xl overflow-hidden shadow-lg">
                {lawItem.imageUrl.startsWith("http") ||
                lawItem.imageUrl.startsWith("/") ? (
                  <Image
                    src={lawItem.imageUrl}
                    alt={lawItem.title}
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                    priority
                    sizes="100vw"
                    style={{ objectFit: "contain" }}
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-500">Invalid image URL</span>
                  </div>
                )}
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
                onClick={() => {
                  if (lawItem.pdfUrl) {
                    const a = document.createElement("a");
                    a.href = lawItem.pdfUrl;
                    a.download = lawItem.title + ".pdf";
                    a.target = "_blank";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                  }
                }}
              >
                PDF файл татах
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
