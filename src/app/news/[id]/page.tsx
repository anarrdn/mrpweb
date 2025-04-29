"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api/client";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  link: string;
}

export default function NewsPage() {
  const params = useParams<{ id: string }>();
  const [newsContent, setNewsContent] = useState<NewsItem>({
    title: "Loading...",
    description: "Loading...",
    imageUrl: "",
    date: "",
    link: "",
    id: params.id as string,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const settings = await apiClient.getSettings();
        if (settings && Array.isArray(settings)) {
          const newsSetting = settings.find(
            (s) => s.key === `news.${params.id}`
          );
          if (newsSetting) {
            const newsData = JSON.parse(newsSetting.value);
            setNewsContent(newsData);
          }
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    fetchNews();
  }, [params.id]);

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

        {newsContent.imageUrl && (
          <div className="mb-8">
            <Image
              src={newsContent.imageUrl}
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
              Мэдээний эх сурвалж руу очих
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
