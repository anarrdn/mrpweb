"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
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
    content: `Эрүүл мэндийн салбарт олон улсын хамтын ажиллагааны гэрээ байгууллаа. Энэхүү гэрээ нь эрүүл мэндийн салбарын үйлчилгээг сайжруулах, хүн амын эрүүл мэндийн түвшинг дээшлүүлэх зорилготой юм.

    Гэрээний үндсэн чиглэлүүд:
    - Эмнэлгийн үйлчилгээний чанар
    - Эрүүл мэндийн мэдлэг, мэдээлэл
    - Хүн амын эрүүл мэндийн хамгаалалт
    - Эрүүл мэндийн байгууллагын менежмент
    
    Гэрээ 2024 оны 6-р сараас эхлэн хэрэгжиж эхлэхээр төлөвлөгдсөн байна.`,
    date: "2024-03-15",
    image: "/branding/consultation.jpg",
    category: "Хамтын ажиллагаа",
    type: "combined",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pdfUrl: "/pdfs/sample.pdf",
  },
  {
    id: "2",
    title: "Хамтын ажиллагааны төсөл",
    description: "Эрүүл мэндийн салбарт хамтын ажиллагааны шинэ төсөл эхэллээ.",
    content: `Эрүүл мэндийн салбарт хамтын ажиллагааны шинэ төсөл эхэллээ. Энэхүү төсөл нь эрүүл мэндийн салбарын үйлчилгээний чанарыг сайжруулах, үйлчлүүлэгчдийн сэтгэл ханамжийг дээшлүүлэх зорилготой юм.

    Төслийн үндсэн чиглэлүүд:
    - Үйлчилгээний процесс
    - Тоног төхөөрөмжийн шинэчлэл
    - Ажилтны мэргэжил
    - Үйлчлүүлэгчдийн сэтгэл ханамж
    
    Төсөл 2024 оны 7-р сараас эхлэн хэрэгжиж эхлэхээр төлөвлөгдсөн байна.`,
    date: "2024-03-10",
    image: "/branding/consultation.jpg",
    category: "Хамтын ажиллагаа",
    type: "combined",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pdfUrl: "/pdfs/sample.pdf",
  },
  {
    id: "3",
    title: "Хамтын ажиллагааны тайлан",
    description:
      "Эрүүл мэндийн салбарт хамтын ажиллагааны сүүлийн үеийн тайлан.",
    content: `Эрүүл мэндийн салбарт хамтын ажиллагааны сүүлийн үеийн тайлан. Энэхүү тайланд эрүүл мэндийн салбарын сүүлийн үеийн үйл ажиллагаа, үр дүн, чиг хандлага зэргийг тусгасан болно.

    Тайлангийн үндсэн чиглэлүүд:
    - Үйл ажиллагааны үр дүн
    - Санхүүгийн тайлан
    - Ирээдүйн төлөвлөгөө
    - Санал хүсэлт
    
    Тайлан 2024 оны 3-р сарын 1-ний өдөр батлагдсан.`,
    date: "2024-03-05",
    image: "/branding/consultation.jpg",
    category: "Хамтын ажиллагаа",
    type: "combined",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pdfUrl: "/pdfs/sample.pdf",
  },
];

export default function CooperationNewsDetailPage() {
  const params = useParams<{ id: string }>();
  const news = cooperationNews.find((item) => item.id === params.id);

  if (!news) {
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
            href="/news/cooperation"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Буцах
          </Link>
        </div>
      </div>
    );
  }

  // Format date consistently
  const formattedDate = new Date(news.date).toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <section className="w-full flex justify-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl px-6 py-12 mb-16">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs aria-label="breadcrumb" className="text-sm">
            <Link color="inherit" href="/" className="text-sm">
              Нүүр
            </Link>
            <Link color="inherit" href="/news" className="text-sm">
              Мэдээ мэдээлэл
            </Link>
            <Link color="inherit" href="/news/cooperation" className="text-sm">
              Хамтын ажиллагааны мэдээ
            </Link>
            <Typography color="text.primary">{news.title}</Typography>
          </Breadcrumbs>
        </div>

        {/* News Content */}
        <article>
          <div className="relative h-96 w-full mb-8 rounded-xl overflow-hidden">
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-[#00b1ad] text-white rounded-full text-sm font-semibold">
              {news.category}
            </span>
            <span className="text-gray-500">{formattedDate}</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {news.title}
          </h1>

          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">{news.description}</p>
            <div className="whitespace-pre-line text-gray-700 mb-8">
              {news.content}
            </div>
          </div>

          {/* Show both YouTube and PDF content */}
          <div className="space-y-8">
            {/* YouTube Video Section */}
            <div className="border-t pt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Видео бичлэг
              </h2>
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  src={news.youtubeUrl}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Website Link Section */}
            <div className="border-t pt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Цахим холбоос
              </h2>
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
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
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Цахим хуудас руу очих
              </a>
            </div>

            {/* PDF Section */}
            <div className="border-t pt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Тайлангийн маягт
                </h2>
                <a
                  href={news.pdfUrl}
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
                  src={`${news.pdfUrl}#toolbar=0`}
                  className="w-full h-full"
                  title="PDF Viewer"
                />
              </div>
            </div>
          </div>
        </article>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Link
            href="/news/cooperation"
            className="inline-flex items-center px-6 py-3 bg-[#00b1ad] text-white rounded-lg hover:bg-[#00b1ad]/90 transition-colors"
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
