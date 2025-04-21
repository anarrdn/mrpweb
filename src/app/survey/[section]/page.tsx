"use client";

import { useParams } from "next/navigation";
import { useContent } from "@/lib/content/content.context";
import { EditButton } from "@/components/ui/edit-button";
import { useState, useEffect } from "react";
import { DynamicEditModal } from "@/components/ui/dynamic-edit-modal";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function SurveyPage() {
  const params = useParams<{ section: string }>();
  const { content, updateContent } = useContent();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get the survey content for the current section
  const surveyContent = content.survey?.[params.section] || {
    title: "Loading...",
    description: "Loading...",
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
            {surveyContent.title}
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {surveyContent.image && (
              <div className="relative w-full aspect-[16/9] mb-8 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={surveyContent.image}
                  alt={surveyContent.title}
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
              {surveyContent.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {surveyContent.link && (
              <Button
                variant="default"
                className="w-full sm:w-auto px-6 py-3 text-lg"
                onClick={() =>
                  surveyContent.link &&
                  window.open(surveyContent.link, "_blank")
                }
              >
                Вэбсайт руу очих
              </Button>
            )}
            {surveyContent.pdf && (
              <Button
                variant="outline"
                className="w-full sm:w-auto px-6 py-3 text-lg"
                onClick={() =>
                  surveyContent.pdf && window.open(surveyContent.pdf, "_blank")
                }
              >
                PDF файл үзэх
              </Button>
            )}
          </div>
        </div>

        <DynamicEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Survey"
          initialData={{
            title: surveyContent.title,
            description: surveyContent.description,
            image: surveyContent.image,
            pdf: surveyContent.pdf,
            link: surveyContent.link,
          }}
          onSave={(updatedData) => {
            updateContent("survey", {
              ...content.survey,
              [params.section]: {
                title: updatedData.title,
                description: updatedData.description,
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
