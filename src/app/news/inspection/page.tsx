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

const inspectionNews = [
  {
    id: "1",
    title: "Эмийн сангийн хяналт шалгалтын үр дүн",
    description:
      "2024 оны эхний улирлын эмийн сангийн хяналт шалгалтын үр дүн гарлаа.",
    date: "2024-03-15",
    image: "/branding/consultation.jpg",
    category: "Хяналт шалгалт",
  },
  {
    id: "2",
    title: "Эмнэлгийн тусламж үйлчилгээний чанарын хяналт",
    description:
      "Эмнэлгийн тусламж үйлчилгээний чанарын хяналтын үр дүн гарлаа.",
    date: "2024-03-10",
    image: "/branding/consultation.jpg",
    category: "Хяналт шалгалт",
  },
  {
    id: "3",
    title: "Эрүүл мэндийн байгууллагын хяналт шалгалт",
    description: "Эрүүл мэндийн байгууллагын хяналт шалгалтын үр дүн гарлаа.",
    date: "2024-03-05",
    image: "/branding/consultation.jpg",
    category: "Хяналт шалгалт",
  },
  {
    id: "4",
    title: "Эмийн сангийн үйл ажиллагааны хяналт",
    description: "Эмийн сангийн үйл ажиллагааны хяналтын үр дүн гарлаа.",
    date: "2024-02-28",
    image: "/branding/consultation.jpg",
    category: "Хяналт шалгалт",
  },
  {
    id: "5",
    title: "Эмнэлгийн тусламж үйлчилгээний хяналт",
    description: "Эмнэлгийн тусламж үйлчилгээний хяналтын үр дүн гарлаа.",
    date: "2024-02-20",
    image: "/branding/consultation.jpg",
    category: "Хяналт шалгалт",
  },
  {
    id: "6",
    title: "Эрүүл мэндийн байгууллагын хяналт шалгалт",
    description: "Эрүүл мэндийн байгууллагын хяналт шалгалтын үр дүн гарлаа.",
    date: "2024-02-15",
    image: "/branding/consultation.jpg",
    category: "Хяналт шалгалт",
  },
];

export default function InspectionNewsPage() {
  return (
    <section className="w-full flex justify-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl px-6 py-12 mt-10 mb-16">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              Нүүр
            </Link>
            <Link color="inherit" href="/news">
              Мэдээ мэдээлэл
            </Link>
            <Typography color="text.primary">
              Хяналт шалгалтын мэдээлэл
            </Typography>
          </Breadcrumbs>
        </div>
        <h1 className="text-4xl font-extrabold mb-4 text-center text-gray-900">
          Хяналт шалгалтын мэдээлэл
        </h1>
        <p className="text-lg text-gray-600 mb-10 text-center">
          Эрүүл мэндийн салбарын хяналт шалгалтын мэдээлэл:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inspectionNews.map((news) => (
            <Link href={`/news/inspection/${news.id}`} key={news.id}>
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
                    <span className="text-sm text-blue-600 font-semibold">
                      {news.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(news.date).toLocaleDateString("mn-MN")}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
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
