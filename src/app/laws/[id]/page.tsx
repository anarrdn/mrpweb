"use client";

import { useParams } from "next/navigation";
import { useContent } from "@/lib/content/content.context";
import { EditButton } from "@/components/ui/edit-button";
import { useState, useEffect } from "react";
import { LawEditModal } from "@/components/law/LawEditModal";
import Image from "next/image";
import { LawItem } from "@/lib/content/types";

export default function LawPage() {
  const params = useParams<{ id: string }>();
  const { content, updateLawSection } = useContent();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const lawItem = content.laws.find((law) => law.id === params.id);

  if (!mounted || !lawItem) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg relative">
        <EditButton onClick={() => setIsEditModalOpen(true)} />
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
      <LawEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        lawId={params.id}
        initialData={lawItem}
        onSave={(updatedData) => {
          updateLawSection(params.id, updatedData);
        }}
      />
    </div>
  );
}
