"use client";

import { useParams } from "next/navigation";
import { useContent } from "@/lib/content/content.context";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function SurveyPage() {
  const params = useParams<{ id: string }>();
  const { content } = useContent();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const surveyContent = content.survey?.[params.id] || {
    title: "Loading...",
    description: "Loading...",
    imageUrl: "",
    pdfUrl: "",
    websiteLink: "",
  };

  if (!mounted) {
    return null;
  }

  if (!content.survey?.[params.id]) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Мэдээлэл олдсонгүй
          </h1>
          <p className="text-gray-600 mb-4">
            Уучлаарай, хайсан мэдээлэл олдсонгүй.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{surveyContent.title}</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-8">{surveyContent.description}</p>
        </div>

        {surveyContent.imageUrl && (
          <div className="mb-8">
            <Image
              src={surveyContent.imageUrl}
              alt={surveyContent.title}
              width={800}
              height={450}
              className="rounded-lg shadow-lg"
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {surveyContent.websiteLink && (
            <Button
              variant="default"
              className="w-full sm:w-auto px-6 py-3 text-lg"
              onClick={() =>
                surveyContent.websiteLink &&
                window.open(surveyContent.websiteLink, "_blank")
              }
            >
              Вэбсайт руу очих
            </Button>
          )}
          {surveyContent.pdfUrl && (
            <Button
              variant="outline"
              className="w-full sm:w-auto px-6 py-3 text-lg"
              onClick={() =>
                surveyContent.pdfUrl &&
                window.open(surveyContent.pdfUrl, "_blank")
              }
            >
              PDF файл татах
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
