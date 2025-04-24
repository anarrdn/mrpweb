"use client";

import { useParams } from "next/navigation";
import { useContent } from "@/lib/content/content.context";
import { EditButton } from "@/components/ui/edit-button";
import { useState, useEffect } from "react";
import { DynamicEditModal } from "@/components/ui/dynamic-edit-modal";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ContractPage() {
  const params = useParams<{ section: string }>();
  const { content, updateContent } = useContent();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get the contract content for the current section
  const contractContent = content.contract?.[params.section] || {
    title: "Loading...",
    description: "Loading...",
    image: null,
    pdf: null,
    link: null,
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg relative">
        <EditButton onClick={() => setIsEditModalOpen(true)} />
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {contractContent.title}
          </h1>
          {contractContent.image && (
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src={contractContent.image}
                alt={contractContent.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="prose max-w-none">
            <p className="text-gray-600 whitespace-pre-line">
              {contractContent.description}
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            {contractContent.link && (
              <a
                href={contractContent.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Visit Link
              </a>
            )}
            {contractContent.pdf && (
              <a
                href={contractContent.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View PDF
              </a>
            )}
          </div>
        </div>
      </div>
      <DynamicEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Contract"
        initialData={{
          title: contractContent.title,
          description: contractContent.description,
          image: contractContent.image,
          pdf: contractContent.pdf,
          link: contractContent.link,
        }}
        onSave={(updatedData) => {
          updateContent("contract", {
            ...content.contract,
            [params.section]: {
              title: updatedData.title,
              description: updatedData.description,
              image: updatedData.image,
              pdf: updatedData.pdf,
              link: updatedData.link,
            },
          });
        }}
      />
    </div>
  );
}
