"use client";

import { useParams } from "next/navigation";
import { useContent } from "@/lib/content/content.context";
import { useState, useEffect } from "react";
import Image from "next/image";
import { LawItem } from "@/lib/content/types";
import { Button } from "@/components/ui/button";

export default function LawPage() {
  const params = useParams<{ id: string }>();
  const { content } = useContent();
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
    <section className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{currentLaw.title}</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-8">{currentLaw.description}</p>
        </div>

        {currentLaw.imageUrl && (
          <div className="mb-8">
            <Image
              src={currentLaw.imageUrl}
              alt={currentLaw.title}
              width={800}
              height={450}
              className="rounded-lg shadow-lg"
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {currentLaw.websiteLink && (
            <Button
              variant="default"
              className="w-full sm:w-auto px-6 py-3 text-lg"
              onClick={() =>
                currentLaw.websiteLink &&
                window.open(currentLaw.websiteLink, "_blank")
              }
            >
              Вэбсайт руу очих
            </Button>
          )}
          {currentLaw.pdfUrl && (
            <Button
              variant="outline"
              className="w-full sm:w-auto px-6 py-3 text-lg"
              onClick={() =>
                currentLaw.pdfUrl && window.open(currentLaw.pdfUrl, "_blank")
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
