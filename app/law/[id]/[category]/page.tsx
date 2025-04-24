"use client";

import { useParams } from "next/navigation";
import { useContent } from "@/lib/content/content.context";
import { EditButton } from "@/components/ui/edit-button";
import { useState, useEffect } from "react";
import { DynamicEditModal } from "@/components/ui/dynamic-edit-modal";
import Image from "next/image";
import { LawItem } from "@/lib/content/types";
import { Button } from "@/components/ui/button";

export default function LawCategoryPage() {
  const params = useParams<{ category: string }>();
  const { content, updateContent } = useContent();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = [
    { id: "law", label: "Монгол улсын хууль" },
    { id: "parliament", label: "УИХ-ын тогтоол" },
    { id: "government", label: "Засгийн газрын тогтоол" },
    { id: "health-minister", label: "Эрүүл мэндийн сайдын тушаал" },
    { id: "emdz", label: "ЭМДҮЗ-ийн тогтоол" },
    { id: "emdeg", label: "ЭМДЕГ-ын даргын тушаал" },
    { id: "other", label: "Бусад эрх зүйн акт" },
  ];

  const currentCategory = categories.find((cat) => cat.id === params.category);
  const filteredLaws = content.laws?.filter(
    (law) => law.id === params.category
  );

  if (!mounted) {
    return null;
  }

  if (!currentCategory) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Ангилал олдсонгүй
          </h1>
          <p className="text-gray-600 mb-4">
            Уучлаарай, хайсан ангилал олдсонгүй.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-white pt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-6">
          <Button onClick={() => setIsEditModalOpen(true)} variant="outline">
            Tahrirlash
          </Button>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {currentCategory.label}
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLaws?.map((law) => (
            <div
              key={law.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64">
                <Image
                  src={law.imageUrl}
                  alt={law.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {law.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {law.description}
                </p>

                <div className="flex flex-col space-y-3">
                  <a
                    href={law.websiteLink}
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
                  </a>

                  <a
                    href={law.pdfUrl}
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

        <DynamicEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Law Category"
          initialData={currentCategory}
          onSave={(updatedData) => {
            const updatedLaws = content.laws?.map((law) =>
              law.id === params.category ? { ...law, ...updatedData } : law
            );
            updateContent("laws", updatedLaws);
          }}
        />
      </div>
    </section>
  );
}
