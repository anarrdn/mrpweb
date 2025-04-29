"use client";

import { useParams } from "next/navigation";
import { useContent } from "@/lib/content/content.context";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function SurveyPage() {
  const params = useParams<{ section: string }>();
  const { content } = useContent();
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
    <section className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{surveyContent.title}</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-8">{surveyContent.description}</p>
        </div>

        {surveyContent.image && (
          <div className="mb-8">
            <Image
              src={surveyContent.image}
              alt={surveyContent.title}
              width={800}
              height={450}
              className="rounded-lg shadow-lg"
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {surveyContent.link && (
            <Button
              variant="default"
              className="w-full sm:w-auto px-6 py-3 text-lg"
              onClick={() =>
                surveyContent.link && window.open(surveyContent.link, "_blank")
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
              PDF файл татах
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
