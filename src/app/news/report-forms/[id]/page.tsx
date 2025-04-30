"use client";

import { useParams } from "next/navigation";
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

export default function ReportFormDetailPage() {
  const params = useParams<{ id: string }>();
  const form = reportForms.find((item) => item.id === params.id);

  if (!form) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Мэдээлэл олдсонгүй
          </h1>
          <p className="text-gray-600 mb-4">
            Уучлаарай, хайсан мэдээлэл олдсонгүй.
          </p>
          <Link
            href="/news/report-forms"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Буцах
          </Link>
        </div>
      </div>
    );
  }

  // Format date consistently
  const formattedDate = new Date(form.date).toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <section className="w-full flex justify-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl px-6 py-12 mt-10 mb-16">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs aria-label="breadcrumb" className="text-sm">
            <Link color="inherit" href="/" className="text-sm">
              Нүүр
            </Link>
            <Link color="inherit" href="/news" className="text-sm">
              Мэдээ мэдээлэл
            </Link>
            <Link color="inherit" href="/news/report-forms" className="text-sm">
              Тайлангийн маягтууд
            </Link>
            <Typography color="text.primary">{form.title}</Typography>
          </Breadcrumbs>
        </div>

        {/* Form Content */}
        <article>
          <div className="relative h-96 w-full mb-8 rounded-xl overflow-hidden">
            <Image
              src={form.image}
              alt={form.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              {form.category}
            </span>
            <span className="text-gray-500">{formattedDate}</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {form.title}
          </h1>

          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">{form.description}</p>
            <div className="whitespace-pre-line text-gray-700 mb-8">
              {form.content}
            </div>
          </div>

          {/* PDF Viewer */}
          {form.pdfUrl && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Тайлангийн маягт
                </h2>
                <a
                  href={form.pdfUrl}
                  download
                  className="inline-flex items-center px-4 py-2 bg-[#00b1ad] text-white rounded-lg hover:bg-[#00b1ad]/90 transition-colors"
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Татах
                </a>
              </div>
              <div className="h-[600px] border rounded-lg overflow-hidden">
                <iframe
                  src={`${form.pdfUrl}#toolbar=0`}
                  className="w-full h-full"
                  title="PDF Viewer"
                />
              </div>
            </div>
          )}
        </article>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Link
            href="/news/report-forms"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Буцах
          </Link>
        </div>
      </div>
    </section>
  );
}
