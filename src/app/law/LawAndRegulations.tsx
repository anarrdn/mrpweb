"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type LawItem = {
  id: string;
  title: string;
  description: string;
  websiteLink: string;
  imageUrl: string;
  pdfUrl: string;
};

const lawItems: LawItem[] = [
  {
    id: "law",
    title: "Монгол улсын хууль",
    description:
      "Монгол улсын эрүүл мэндийн тухай хууль, эмийн тухай хууль болон бусад холбогдох хууль тогтоомжууд",
    websiteLink: "https://www.legalinfo.mn/law/details/",
    imageUrl: "/images/laws/mongolian-law.jpg",
    pdfUrl: "/pdfs/laws/mongolian-law.pdf",
  },
  {
    id: "parliament",
    title: "УИХ-ын тогтоол",
    description: "Улсын Их Хурлын эрүүл мэндийн салбарт холбогдох тогтоолууд",
    websiteLink: "https://www.parliament.mn/laws/",
    imageUrl: "/images/laws/parliament.jpg",
    pdfUrl: "/pdfs/laws/parliament.pdf",
  },
  {
    id: "government",
    title: "Засгийн газрын тогтоол",
    description: "Засгийн газрын эрүүл мэндийн салбарт холбогдох тогтоолууд",
    websiteLink: "https://www.legalinfo.mn/law/details/",
    imageUrl: "/images/laws/government.jpg",
    pdfUrl: "/pdfs/laws/government.pdf",
  },
  {
    id: "health-minister",
    title: "Эрүүл мэндийн сайдын тушаал",
    description: "Эрүүл мэндийн сайдын эмийн салбарт холбогдох тушаалууд",
    websiteLink: "https://www.mohs.mn/law/",
    imageUrl: "/images/laws/health-minister.jpg",
    pdfUrl: "/pdfs/laws/health-minister.pdf",
  },
  {
    id: "emdz",
    title: "ЭМДҮЗ-ийн тогтоол",
    description: "Эм, эмнэлгийн хэрэгслийн хяналтын газрын тогтоолууд",
    websiteLink: "https://www.emdz.mn/law/",
    imageUrl: "/images/laws/emdz.jpg",
    pdfUrl: "/pdfs/laws/emdz.pdf",
  },
  {
    id: "emdeg",
    title: "ЭМДЕГ-ын даргын тушаал",
    description: "Эм, эмнэлгийн хэрэгслийн газрын даргын тушаалууд",
    websiteLink: "https://www.emdeg.mn/law/",
    imageUrl: "/images/laws/emdeg.jpg",
    pdfUrl: "/pdfs/laws/emdeg.pdf",
  },
  {
    id: "other",
    title: "Бусад эрх зүйн акт",
    description: "Эрүүл мэндийн салбарт холбогдох бусад эрх зүйн актууд",
    websiteLink: "https://www.legalinfo.mn/law/details/",
    imageUrl: "/images/laws/other.jpg",
    pdfUrl: "/pdfs/laws/other.pdf",
  },
];

export default function LawAndRegulations() {
  const [selectedItem, setSelectedItem] = useState<LawItem | null>(null);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Хууль эрх зүй</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lawItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>

                <div className="flex flex-col space-y-2">
                  <Link
                    href={item.websiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 flex items-center"
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
                    Вэбсайтын линк
                  </Link>

                  <a
                    href={item.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 flex items-center"
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
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    PDF материал
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
