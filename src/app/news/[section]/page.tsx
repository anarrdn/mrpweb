"use client";

import { useParams } from "next/navigation";
import { useContent } from "@/lib/content/content.context";
import { useState, useEffect } from "react";
import Image from "next/image";
import { NewsContent } from "@/lib/content/types";
import { News } from "@/types/news";
import { Button } from "@/components/ui/button";
import { DocumentIcon, LinkIcon, PlayIcon } from "@heroicons/react/24/outline";

function isBase64Image(str: string) {
  return str.startsWith("data:image");
}

export default function NewsPage() {
  const params = useParams<{ section: string }>();
  const { content } = useContent();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get the news content for the current section
  const newsContent = content.news?.[params.section] || {
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
        <h1 className="text-3xl font-bold mb-6">{newsContent.title}</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-8">{newsContent.description}</p>
        </div>

        {newsContent.image && (
          <div className="mb-8">
            <Image
              src={newsContent.image}
              alt={newsContent.title}
              width={800}
              height={450}
              className="rounded-lg shadow-lg"
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          {newsContent.pdf && (
            <Button
              variant="outline"
              className="w-full sm:w-auto px-6 py-3 text-lg"
              onClick={() =>
                newsContent.pdf && window.open(newsContent.pdf, "_blank")
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
