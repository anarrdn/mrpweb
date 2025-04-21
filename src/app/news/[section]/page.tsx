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
    <section className="py-24 bg-white pt-40 scroll-mt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {newsContent.title}
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {newsContent.image && (
              <div className="relative w-full aspect-[16/9] mb-8 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={newsContent.image}
                  alt={newsContent.title}
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
              {newsContent.content}
            </p>
          </div>

          {(newsContent.pdf || newsContent.link) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {newsContent.pdf && (
                <Button
                  variant="outline"
                  className="w-full sm:w-auto px-6 py-3 text-lg"
                  onClick={() =>
                    newsContent.pdf && window.open(newsContent.pdf, "_blank")
                  }
                >
                  PDF файл үзэх
                </Button>
              )}
              {newsContent.link && (
                <Button
                  variant="default"
                  className="w-full sm:w-auto px-6 py-3 text-lg"
                  onClick={() =>
                    newsContent.link && window.open(newsContent.link, "_blank")
                  }
                >
                  Вэбсайт руу очих
                </Button>
              )}
            </div>
          )}
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
            setIsEditModalOpen(false);
          }}
        />
      </div>
    </section>
  );
}
