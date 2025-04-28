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
import {
  PencilIcon,
  DocumentIcon,
  LinkIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";

function isBase64Image(str: string) {
  return str.startsWith("data:image");
}

export default function NewsPage() {
  const params = useParams();
  const section = params.section as string;
  const { content, updateContent } = useContent();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const newsContent = content?.news?.[section] || {
    title: "",
    description: "",
    image: null,
    pdf: null,
    link: null,
    youtube: null,
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          {newsContent.title}
        </h1>
        <div className="relative mb-8">
          {newsContent.image && (
            <div className="relative w-full h-96">
              {isBase64Image(newsContent.image) ? (
                <img
                  src={newsContent.image}
                  alt={newsContent.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <Image
                  src={newsContent.image}
                  alt={newsContent.title}
                  fill
                  className="object-cover rounded-lg"
                />
              )}
            </div>
          )}
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg"
          >
            <PencilIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="prose max-w-none">
          <p className="whitespace-pre-line">{newsContent.description}</p>
        </div>
        {(newsContent.pdf || newsContent.link || newsContent.youtube) && (
          <div className="mt-8 flex flex-wrap gap-4">
            {newsContent.pdf && (
              <a
                href={newsContent.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <DocumentIcon className="w-5 h-5 mr-2" />
                PDF-i yüklə
              </a>
            )}
            {newsContent.link && (
              <a
                href={newsContent.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <LinkIcon className="w-5 h-5 mr-2" />
                Linkə keç
              </a>
            )}
            {newsContent.youtube && (
              <a
                href={newsContent.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <PlayIcon className="w-5 h-5 mr-2" />
                YouTube video
              </a>
            )}
          </div>
        )}
      </div>

      <DynamicEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Xəbəri redaktə et"
        initialData={newsContent}
        onSave={(data) => {
          updateContent("news", {
            ...content.news,
            [section]: data as NewsContent,
          });
          setIsEditModalOpen(false);
        }}
      />
    </div>
  );
}
