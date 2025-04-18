"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { LawSectionProps } from "./types";
import { LawEditModal } from "./LawEditModal";
import { EditButton } from "@/components/ui/edit-button";
import { useAuth } from "@/lib/auth/auth.context";
import { useContent } from "@/lib/content/content.context";

export const LawSection = ({ lawItem }: LawSectionProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { isAuthenticated } = useAuth();
  const { updateLawSection } = useContent();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePdfDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (lawItem.pdfUrl) {
      // If it's a base64 string (from file upload), create a download link
      if (lawItem.pdfUrl.startsWith("data:application/pdf;base64,")) {
        const link = document.createElement("a");
        link.href = lawItem.pdfUrl;
        link.download = `${lawItem.title}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // If it's a URL, open in new tab
        window.open(lawItem.pdfUrl, "_blank");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg relative">
        {isClient && isAuthenticated && (
          <div className="absolute top-4 right-4">
            <EditButton onClick={() => setIsEditModalOpen(true)} />
          </div>
        )}
        <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
          <Image
            src={lawItem.imageUrl}
            alt={lawItem.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {lawItem.title}
        </h1>
        <p className="text-gray-600 mb-6">{lawItem.description}</p>
        <div className="flex space-x-4">
          {lawItem.websiteLink && (
            <a
              href={lawItem.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Холбоосруу Шилжих
            </a>
          )}
          {lawItem.pdfUrl && (
            <button
              onClick={handlePdfDownload}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              PDF Татах
            </button>
          )}
        </div>
      </div>
      {isClient && isAuthenticated && (
        <LawEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          lawId={lawItem.id}
          initialData={lawItem}
          onSave={(updatedData) => {
            updateLawSection(lawItem.id, updatedData);
          }}
        />
      )}
    </div>
  );
};
