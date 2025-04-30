"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const Breadcrumbs = dynamic(() => import("@mui/material/Breadcrumbs"), {
  ssr: false,
});
const Typography = dynamic(() => import("@mui/material/Typography"), {
  ssr: false,
});

const videoNews = [
  {
    id: "1",
    title: "Эрүүл мэндийн салбарын шинэ төсөл",
    description:
      "Эрүүл мэндийн салбарын шинэ төслийн танилцуулга видео бичлэг.",
    date: "2024-03-15",
    image: "/branding/consultation.jpg",
    category: "Видео мэдээ",
    type: "youtube",
  },
  {
    id: "2",
    title: "Эмнэлгийн үйлчилгээний шинэчлэл",
    description: "Эмнэлгийн үйлчилгээний шинэчлэлийн талаарх мэдээлэл.",
    date: "2024-03-10",
    image: "/branding/consultation.jpg",
    category: "Видео мэдээ",
    type: "website",
  },
  {
    id: "3",
    title: "Эрүүл мэндийн салбарын тайлан",
    description: "Эрүүл мэндийн салбарын сүүлийн үеийн тайлан.",
    date: "2024-03-05",
    image: "/branding/consultation.jpg",
    category: "Видео мэдээ",
    type: "pdf",
  },
];

export default function VideoNewsPage() {
  return (
    <section className="w-full flex justify-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-6xl px-6 py-12 mb-16">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs aria-label="breadcrumb" className="text-sm">
            <Link color="inherit" href="/" className="text-sm">
              Нүүр
            </Link>
            <Link color="inherit" href="/news" className="text-sm">
              Мэдээ мэдээлэл
            </Link>
            <Typography color="text.primary">Видео мэдээ</Typography>
          </Breadcrumbs>
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-900">
          Видео мэдээ
        </h1>
        <p className="text-base text-gray-600 mb-10 text-center">
          Эрүүл мэндийн салбарын видео мэдээ, танилцуулга:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoNews.map((news) => (
            <Link href={`/news/video-news/${news.id}`} key={news.id}>
              <Card className="h-full overflow-hidden rounded-xl hover:shadow-2xl transition-shadow group">
                <div className="relative h-48 w-full">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-[#00b1ad] font-semibold">
                      {news.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(news.date).toLocaleDateString("mn-MN")}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#00b1ad] transition-colors">
                    {news.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-2">
                    {news.description}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
