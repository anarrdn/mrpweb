"use client";

import { useParams } from "next/navigation";
import { useContent } from "@/lib/content/content.context";
import { EditButton } from "@/components/ui/edit-button";
import { useState, useEffect } from "react";
import { DynamicEditModal } from "@/components/ui/dynamic-edit-modal";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function LinksPage() {
  const params = useParams<{ section: string }>();
  const { content, updateContent } = useContent();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get the link content for the current section
  const linkContent = content.links?.[params.section] || {
    title: "Loading...",
    description: "Loading...",
    image: null,
    websiteLink: null,
    pdfUrl: null,
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg relative">
        <EditButton onClick={() => setIsEditModalOpen(true)} />
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {linkContent.title}
          </h1>
          {linkContent.image && (
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src={linkContent.image}
                alt={linkContent.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="prose max-w-none">
            <p className="text-gray-600 whitespace-pre-line">
              {linkContent.description}
            </p>
          </div>
          {linkContent.websiteLink && (
            <Button
              variant="outline"
              onClick={() => window.open(linkContent.websiteLink, "_blank")}
            >
              Visit Website
            </Button>
          )}
          {linkContent.pdfUrl && (
            <Button
              variant="outline"
              onClick={() => window.open(linkContent.pdfUrl, "_blank")}
            >
              View PDF
            </Button>
          )}
        </div>
      </div>
      <DynamicEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Link"
        initialData={{
          title: linkContent.title,
          description: linkContent.description,
          image: linkContent.image,
          websiteLink: linkContent.websiteLink,
          pdfUrl: linkContent.pdfUrl,
        }}
        onSave={(updatedData) => {
          updateContent("links", {
            ...content.links,
            [params.section]: {
              title: updatedData.title,
              description: updatedData.description,
              image: updatedData.image,
              websiteLink: updatedData.websiteLink,
              pdfUrl: updatedData.pdfUrl,
            },
          });
        }}
      />
    </div>
  );
}
