"use client";

import { useParams } from "next/navigation";
import { useContent } from "@/lib/content/content.context";
import { EditButton } from "@/components/ui/edit-button";
import { useState, useEffect } from "react";
import Image from "next/image";
import { LawItem } from "@/lib/content/types";
import { DynamicEditModal } from "@/components/ui/dynamic-edit-modal";

export default function LawPage() {
  const params = useParams<{ id: string }>();
  const { content, updateContent } = useContent();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Ensure laws is an array and find the law item
  const lawItems = Array.isArray(content.laws) ? content.laws : [];
  const lawItem = lawItems.find((law) => law.id === params.id);

  if (!mounted) {
    return null;
  }

  if (!lawItem) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Хууль олдсонгүй
          </h1>
          <p className="text-gray-600">Уучлаарай, хайсан хууль олдсонгүй.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg relative">
        <div className="absolute top-4 right-4">
          <EditButton onClick={() => setIsEditModalOpen(true)} />
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{lawItem.title}</h1>
          {lawItem.imageUrl && (
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src={lawItem.imageUrl}
                alt={lawItem.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="prose max-w-none">
            <p className="text-gray-600 whitespace-pre-line">
              {lawItem.description}
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            {lawItem.websiteLink && (
              <a
                href={lawItem.websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Visit Website
              </a>
            )}
            {lawItem.pdfUrl && (
              <a
                href={lawItem.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View PDF
              </a>
            )}
          </div>
        </div>
      </div>
      <DynamicEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Law"
        initialData={lawItem}
        onSave={(updatedData) => {
          const updatedLaws = lawItems.map((law) =>
            law.id === params.id ? { ...law, ...updatedData } : law
          );
          updateContent("laws", updatedLaws);
        }}
      />
    </div>
  );
}
