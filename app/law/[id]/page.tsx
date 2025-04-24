"use client";

import { useParams } from "next/navigation";
import { useContent } from "@/lib/content/content.context";
import { EditButton } from "@/components/ui/edit-button";
import { useState, useEffect } from "react";
import { DynamicEditModal } from "@/components/ui/dynamic-edit-modal";
import Image from "next/image";
import { LawItem } from "@/lib/content/types";
import { Button } from "@/components/ui/button";

export default function LawPage() {
  const params = useParams<{ id: string }>();
  const { content, updateContent } = useContent();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = [
    { id: "law", label: "Монгол улсын хууль" },
    { id: "parliament", label: "УИХ-ын тогтоол" },
    { id: "government", label: "Засгийн газрын тогтоол" },
    { id: "health-minister", label: "Эрүүл мэндийн сайдын тушаал" },
    { id: "emdz", label: "ЭМДҮЗ-ийн тогтоол" },
    { id: "emdeg", label: "ЭМДЕГ-ын даргын тушаал" },
    { id: "other", label: "Бусад эрх зүйн акт" },
  ];

  const currentCategory = categories.find((cat) => cat.id === params.id);
  const filteredLaws = content.laws?.filter((law) => law.id === params.id);
  const currentLaw = filteredLaws?.[0] || {
    title: "Loading...",
    description: "Loading...",
    imageUrl: null,
    pdfUrl: null,
    websiteLink: null,
  };

  if (!mounted) {
    return null;
  }

  if (!currentCategory) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Ангилал олдсонгүй
          </h1>
          <p className="text-gray-600 mb-4">
            Уучлаарай, хайсан ангилал олдсонгүй.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-white pt-40 scroll-mt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {currentCategory.label}
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {currentLaw.imageUrl && (
              <div className="relative w-full mb-8 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={currentLaw.imageUrl}
                  alt={currentLaw.title}
                  width={1920}
                  height={1080}
                  className="w-full h-auto"
                  priority
                  sizes="100vw"
                  style={{ objectFit: "contain" }}
                />
              </div>
            )}
            <div className="absolute top-4 right-4">
              <EditButton onClick={() => setIsEditModalOpen(true)} />
            </div>
          </div>

          <div className="prose max-w-none mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {currentLaw.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
              {currentLaw.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {currentLaw.websiteLink && (
              <Button
                variant="default"
                className="w-full sm:w-auto px-6 py-3 text-lg"
                onClick={() => window.open(currentLaw.websiteLink, "_blank")}
              >
                Вэбсайт руу очих
              </Button>
            )}
            {currentLaw.pdfUrl && (
              <Button
                variant="outline"
                className="w-full sm:w-auto px-6 py-3 text-lg"
                onClick={() => {
                  const a = document.createElement("a");
                  a.href = currentLaw.pdfUrl;
                  a.download = currentLaw.title + ".pdf";
                  a.target = "_blank";
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
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
          initialData={{
            title: currentLaw.title,
            description: currentLaw.description,
            imageUrl: currentLaw.imageUrl,
            pdfUrl: currentLaw.pdfUrl,
            websiteLink: currentLaw.websiteLink,
          }}
          onSave={(updatedData) => {
            updateContent("laws", {
              ...content.laws,
              [params.id]: {
                ...currentLaw,
                title: updatedData.title,
                description: updatedData.description,
                imageUrl: updatedData.imageUrl,
                pdfUrl: updatedData.pdfUrl,
                websiteLink: updatedData.websiteLink,
              },
            });
            setIsEditModalOpen(false);
          }}
        />
      </div>
    </section>
  );
}
