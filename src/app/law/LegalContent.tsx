"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useContent } from "@/lib/content/content.context";

type LawItem = {
  id: string;
  title: string;
  description: string;
  websiteLink: string;
  imageUrl: string;
  pdfUrl: string;
};

export default function LegalContent() {
  const { content } = useContent();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const lawItems = content.laws || {};

  const categories = [
    { id: "law", label: "Монгол улсын хууль" },
    { id: "parliament", label: "УИХ-ын тогтоол" },
    { id: "government", label: "Засгийн газрын тогтоол" },
    { id: "health-minister", label: "Эрүүл мэндийн сайдын тушаал" },
    { id: "emdz", label: "ЭМДҮЗ-ийн тогтоол" },
    { id: "emdeg", label: "ЭМДЕГ-ын даргын тушаал" },
    { id: "other", label: "Бусад эрх зүйн акт" },
  ];

  return (
    <section className="py-24 bg-white pt-32 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Хууль эрх зүй
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Category Navigation */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(lawItems)
            .filter(([id]) => !selectedCategory || id === selectedCategory)
            .map(([id, item]) => (
              <div
                key={id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-col space-y-3">
                    <Link
                      href={item.websiteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center group"
                    >
                      <svg
                        className="w-5 h-5 mr-2 transition-transform group-hover:translate-x-1"
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
                      className="text-blue-600 hover:text-blue-800 flex items-center group"
                    >
                      <svg
                        className="w-5 h-5 mr-2 transition-transform group-hover:translate-x-1"
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
