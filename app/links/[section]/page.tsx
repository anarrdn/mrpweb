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
    youtube: null,
  };

  if (!mounted) {
    return null;
  }

  return (
    <section className="py-24 bg-white pt-40 scroll-mt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {linkContent.title}
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {linkContent.image && (
              <div className="relative w-full aspect-[16/9] mb-8 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={linkContent.image}
                  alt={linkContent.title}
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

          <div className="prose max-w-none mb-12">
            <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
              {linkContent.description}
            </p>
          </div>

          {linkContent.youtube && (
            <div className="relative w-full aspect-video mb-8 rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${
                  linkContent.youtube.includes("youtube.com")
                    ? linkContent.youtube.split("v=")[1].split("&")[0]
                    : linkContent.youtube
                }`}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {linkContent.websiteLink && (
              <Button
                variant="default"
                className="w-full sm:w-auto px-6 py-3 text-lg"
                onClick={() =>
                  linkContent.websiteLink &&
                  window.open(linkContent.websiteLink, "_blank")
                }
              >
                Вэбсайт руу очих
              </Button>
            )}
            {linkContent.pdfUrl && (
              <Button
                variant="outline"
                className="w-full sm:w-auto px-6 py-3 text-lg"
                onClick={() =>
                  linkContent.pdfUrl &&
                  window.open(linkContent.pdfUrl, "_blank")
                }
              >
                PDF файл татах
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
            youtube: linkContent.youtube,
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
                youtube: updatedData.youtube,
              },
            });
            setIsEditModalOpen(false);
          }}
        />
      </div>
    </section>
  );
}
