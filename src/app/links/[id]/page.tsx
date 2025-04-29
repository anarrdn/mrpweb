"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api/client";

interface Link {
  title: string;
  description: string;
  image: string;
  websiteLink: string;
  pdfUrl: string;
  youtube: string;
}

export default function LinksPage() {
  const params = useParams<{ id: string }>();
  const [linkContent, setLinkContent] = useState<Link | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const settings = await apiClient.getSettings();
        if (settings && Array.isArray(settings)) {
          const linkSetting = settings.find(
            (s) => s.key === `links.${params.id}`
          );
          if (linkSetting) {
            const linkData = JSON.parse(linkSetting.value);
            setLinkContent(linkData);
          }
        }
      } catch (error) {
        console.error("Failed to fetch link:", error);
      }
    };

    fetchLink();
  }, [params.id]);

  if (!mounted) {
    return null;
  }

  if (!linkContent) {
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
        <h1 className="text-3xl font-bold mb-6">{linkContent.title}</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-8">{linkContent.description}</p>
        </div>

        {linkContent.image && (
          <div className="mb-8">
            <Image
              src={linkContent.image}
              alt={linkContent.title}
              width={800}
              height={450}
              className="rounded-lg shadow-lg"
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {linkContent.websiteLink && (
            <Button
              variant="default"
              className="w-full sm:w-auto px-6 py-3 text-lg"
              onClick={() =>
                linkContent.websiteLink &&
                window.open(linkContent.websiteLink, "_blank")
              }
            >
              Вэбсайт руу очих
            </Button>
          )}
          {linkContent.pdfUrl && (
            <Button
              variant="outline"
              className="w-full sm:w-auto px-6 py-3 text-lg"
              onClick={() =>
                linkContent.pdfUrl && window.open(linkContent.pdfUrl, "_blank")
              }
            >
              PDF файл татах
            </Button>
          )}
          {linkContent.youtube && (
            <Button
              variant="outline"
              className="w-full sm:w-auto px-6 py-3 text-lg"
              onClick={() =>
                linkContent.youtube &&
                window.open(linkContent.youtube, "_blank")
              }
            >
              YouTube руу очих
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
