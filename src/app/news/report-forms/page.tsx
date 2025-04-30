"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";

const Breadcrumbs = dynamic(() => import("@mui/material/Breadcrumbs"), {
  ssr: false,
});
const Typography = dynamic(() => import("@mui/material/Typography"), {
  ssr: false,
});

const reportForms = [
  {
    id: "1",
    title: "Эмийн сангийн сарын тайлангийн маягт",
    description:
      "Эмийн сангийн сарын тайлангийн маягтыг эндээс татаж авах боломжтой.",
    content: `Эмийн сангийн сарын тайлангийн маягт нь дараах мэдээллийг агуулна:
    - Эмийн сангийн үйл ажиллагааны тайлан
    - Эмийн хадгалалт, тээвэрлэлтийн тайлан
    - Үйлчлүүлэгчдийн тоо, эмийн хэрэглээний тайлан
    - Санхүүгийн тайлан
    
    Маягтыг бөглөхдөө бүх талбарыг анхааралтай бөглөнө үү.`,
    date: "2024-04-16",
    image: "/branding/consultation.jpg",
    category: "Тайлангийн маягт",
    pdfUrl: "/pdfs/sample.pdf",
  },
  {
    id: "2",
    title: "Эмийн сангийн улирлын тайлангийн маягт",
    description:
      "Эмийн сангийн улирлын тайлангийн маягтыг эндээс татаж авах боломжтой.",
    content: `Эмийн сангийн улирлын тайлангийн маягт нь дараах мэдээллийг агуулна:
    - Улирлын үйл ажиллагааны тайлан
    - Эмийн хадгалалт, тээвэрлэлтийн тайлан
    - Үйлчлүүлэгчдийн тоо, эмийн хэрэглээний тайлан
    - Санхүүгийн тайлан
    - Хяналт шалгалтын тайлан
    
    Маягтыг бөглөхдөө бүх талбарыг анхааралтай бөглөнө үү.`,
    date: "2024-04-16",
    image: "/branding/consultation.jpg",
    category: "Тайлангийн маягт",
    pdfUrl: "/pdfs/sample.pdf",
  },
  {
    id: "3",
    title: "Эмийн сангийн жилийн тайлангийн маягт",
    description:
      "Эмийн сангийн жилийн тайлангийн маягтыг эндээс татаж авах боломжтой.",
    content: `Эмийн сангийн жилийн тайлангийн маягт нь дараах мэдээллийг агуулна:
    - Жилийн үйл ажиллагааны тайлан
    - Эмийн хадгалалт, тээвэрлэлтийн тайлан
    - Үйлчлүүлэгчдийн тоо, эмийн хэрэглээний тайлан
    - Санхүүгийн тайлан
    - Хяналт шалгалтын тайлан
    - Шинэчлэл, сайжруулалтын ажлын тайлан
    
    Маягтыг бөглөхдөө бүх талбарыг анхааралтай бөглөнө үү.`,
    date: "2024-04-16",
    image: "/branding/consultation.jpg",
    category: "Тайлангийн маягт",
    pdfUrl: "/pdfs/sample.pdf",
  },
];

export default function ReportFormsPage() {
  return (
    <section className="w-full flex justify-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl px-6 py-12 mt-10 mb-16">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              Нүүр
            </Link>
            <Link color="inherit" href="/news">
              Мэдээ мэдээлэл
            </Link>
            <Typography color="text.primary">Тайлангийн маягтууд</Typography>
          </Breadcrumbs>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Тайлангийн маягтууд
          </h1>
          <p className="text-gray-600 mt-2">
            Эмийн сангийн тайлангийн маягтуудыг эндээс татаж авах боломжтой.
          </p>
        </div>

        {/* Report Forms List */}
        <div className="space-y-6">
          {reportForms.map((form) => (
            <Card key={form.id} className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-48 h-48 rounded-lg overflow-hidden">
                  <Image
                    src={form.image}
                    alt={form.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                      {form.category}
                    </span>
                    <span className="text-gray-500">
                      {new Date(form.date).toLocaleDateString("mn-MN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {form.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{form.description}</p>
                  <div className="whitespace-pre-line text-gray-700 mb-4">
                    {form.content}
                  </div>
                  <Link
                    href={`/news/report-forms/${form.id}`}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    Дэлгэрэнгүй
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
