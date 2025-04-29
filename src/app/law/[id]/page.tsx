"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api/client";

interface LawItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  pdfUrl: string;
  websiteLink: string;
}

export default function LawPage() {
  const params = useParams<{ id: string }>();
  const [lawContent, setLawContent] = useState<LawItem>({
    title: "Loading...",
    description: "Loading...",
    imageUrl: "",
    pdfUrl: "",
    websiteLink: "",
    id: params.id as string,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchLaw = async () => {
      try {
        const settings = await apiClient.getSettings();
        if (settings && Array.isArray(settings)) {
          const lawSetting = settings.find(
            (s) => s.key === `laws.${params.id}`
          );
          if (lawSetting) {
            const lawData = JSON.parse(lawSetting.value);
            setLawContent(lawData);
          }
        }
      } catch (error) {
        console.error("Failed to fetch law:", error);
      }
    };

    fetchLaw();
  }, [params.id]);

  if (!mounted) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{lawContent.title}</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-8">{lawContent.description}</p>
        </div>

        {lawContent.imageUrl && (
          <div className="mb-8">
            <Image
              src={lawContent.imageUrl}
              alt={lawContent.title}
              width={800}
              height={450}
              className="rounded-lg shadow-lg"
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {lawContent.websiteLink && (
            <Button
              variant="default"
              className="w-full sm:w-auto px-6 py-3 text-lg"
              onClick={() =>
                lawContent.websiteLink &&
                window.open(lawContent.websiteLink, "_blank")
              }
            >
              Вэбсайт руу очих
            </Button>
          )}
          {lawContent.pdfUrl && (
            <Button
              variant="outline"
              className="w-full sm:w-auto px-6 py-3 text-lg"
              onClick={() =>
                lawContent.pdfUrl && window.open(lawContent.pdfUrl, "_blank")
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
