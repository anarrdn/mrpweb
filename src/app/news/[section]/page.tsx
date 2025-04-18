"use client";

import { useParams } from "next/navigation";
import { useContent } from "@/lib/content/content.context";
import { EditButton } from "@/components/ui/edit-button";
import { useState, useEffect } from "react";
import { DynamicEditModal } from "@/components/ui/dynamic-edit-modal";
import Image from "next/image";
import { NewsContent } from "@/lib/content/types";
import { News } from "@/types/news";
import { Button } from "@/components/ui/button";

export default function NewsPage() {
  const params = useParams<{ section: string }>();
  const { content, updateContent } = useContent();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get the news content for the current section
  const newsContent: NewsContent = content.news?.[params.section] || {
    title: "Loading...",
    content: "Loading...",
    image: null,
    pdf: null,
    link: null,
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
            {newsContent.title}
          </h1>
          {newsContent.image && (
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src={newsContent.image}
                alt={newsContent.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="prose max-w-none">
            <p className="text-gray-600 whitespace-pre-line">
              {newsContent.content}
            </p>
          </div>
          {(newsContent.pdf || newsContent.link) && (
            <div className="flex flex-col space-y-4">
              {newsContent.pdf && (
                <Button
                  variant="outline"
                  onClick={() =>
                    newsContent.pdf && window.open(newsContent.pdf, "_blank")
                  }
                >
                  View PDF
                </Button>
              )}
              {newsContent.link && (
                <Button
                  variant="outline"
                  onClick={() =>
                    newsContent.link && window.open(newsContent.link, "_blank")
                  }
                >
                  Visit Link
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      <DynamicEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit News"
        initialData={{
          title: newsContent.title,
          content: newsContent.content,
          image: newsContent.image,
          pdf: newsContent.pdf,
          link: newsContent.link,
        }}
        onSave={(updatedData) => {
          updateContent("news", {
            ...content.news,
            [params.section]: {
              title: updatedData.title,
              content: updatedData.content,
              image: updatedData.image,
              pdf: updatedData.pdf,
              link: updatedData.link,
            },
          });
        }}
      />
    </div>
  );
}
