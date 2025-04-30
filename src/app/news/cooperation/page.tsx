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

const cooperationNews = [
  {
    id: "1",
    title: "Олон улсын хамтын ажиллагааны гэрээ",
    description:
      "Эрүүл мэндийн салбарт олон улсын хамтын ажиллагааны гэрээ байгууллаа.",
    date: "2024-03-15",
    image: "/branding/consultation.jpg",
    category: "Хамтын ажиллагаа",
    type: "youtube",
  },
  {
    id: "2",
    title: "Хамтын ажиллагааны төсөл",
    description: "Эрүүл мэндийн салбарт хамтын ажиллагааны шинэ төсөл эхэллээ.",
    date: "2024-03-10",
    image: "/branding/consultation.jpg",
    category: "Хамтын ажиллагаа",
    type: "website",
  },
  {
    id: "3",
    title: "Хамтын ажиллагааны тайлан",
    description:
      "Эрүүл мэндийн салбарт хамтын ажиллагааны сүүлийн үеийн тайлан.",
    date: "2024-03-05",
    image: "/branding/consultation.jpg",
    category: "Хамтын ажиллагаа",
    type: "pdf",
  },
];

export default function CooperationNewsPage() {
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
            <Typography color="text.primary" className="text-sm">
              Хамтын ажиллагааны мэдээ
            </Typography>
          </Breadcrumbs>
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-900">
          Хамтын ажиллагааны мэдээ
        </h1>
        <p className="text-base text-gray-600 mb-10 text-center">
          Эрүүл мэндийн салбарт хамтын ажиллагааны мэдээ, танилцуулга:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cooperationNews.map((news) => (
            <Link href={`/news/cooperation/${news.id}`} key={news.id}>
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
