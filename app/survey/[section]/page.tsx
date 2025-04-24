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
            {surveyContent.title}
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {surveyContent.image && (
              <div className="relative w-full mb-8 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={surveyContent.image}
                  alt={surveyContent.title}
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
            <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
              {surveyContent.description}
            </p>
          </div>

          {surveyContent.youtube && (
            <div className="relative w-full aspect-video mb-8 rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${
                  surveyContent.youtube.includes("youtube.com")
                    ? surveyContent.youtube.split("v=")[1].split("&")[0]
                    : surveyContent.youtube
                }`}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

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
                onClick={() => {
                  if (surveyContent.pdf) {
                    const a = document.createElement("a");
                    a.href = surveyContent.pdf;
                    a.download = surveyContent.title + ".pdf";
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
          title="Edit Survey"
          initialData={{
            title: surveyContent.title,
            description: surveyContent.description,
            image: surveyContent.image,
            pdf: surveyContent.pdf,
            link: surveyContent.link,
            youtube: surveyContent.youtube,
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
