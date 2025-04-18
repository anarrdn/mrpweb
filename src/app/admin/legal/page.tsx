"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useContent } from "@/lib/content/content.context";
import { useAuth } from "@/lib/auth/auth.context";
import { useRouter } from "next/navigation";

type LawItem = {
  id: string;
  title: string;
  description: string;
  websiteLink: string;
  imageUrl: string;
  pdfUrl: string;
};

const initialLawItems: LawItem[] = [
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

export default function LegalAdminPage() {
  const { content, updateLawSection, saveChanges } = useContent();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [lawItems, setLawItems] = useState(content.laws);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, router]);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImageUrl = reader.result as string;
        setLawItems((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, imageUrl: newImageUrl } : item
          )
        );
        // Save to localStorage immediately
        updateLawSection(id, { imageUrl: newImageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPdfUrl = reader.result as string;
        setLawItems((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, pdfUrl: newPdfUrl } : item
          )
        );
        // Save to localStorage immediately
        updateLawSection(id, { pdfUrl: newPdfUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = (id: string, field: keyof LawItem, value: string) => {
    setLawItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
    // Save to localStorage immediately
    updateLawSection(id, { [field]: value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveChanges();
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated) {
    return null; // Will be redirected by useEffect
  }

  if (previewMode && selectedItem) {
    const item = lawItems.find((item) => item.id === selectedItem);
    if (!item) return null;
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Урьдчилан харах горим</h1>
            <button
              onClick={() => setPreviewMode(false)}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Засварлах горим руу буцах
            </button>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-8">
              <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
              <p className="text-gray-600 mb-6">{item.description}</p>

              <div className="flex flex-col space-y-4">
                <Link
                  href={item.websiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
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
                  className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
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
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Хууль тогтоомжийн засвар</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            {previewMode ? "Засах горим" : "Урьдчилан харах"}
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            {isSaving ? "Хадгалж байна..." : "Хадгалах"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lawItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Гарчиг
                </label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) =>
                    handleUpdate(item.id, "title", e.target.value)
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Тайлбар
                </label>
                <textarea
                  value={item.description}
                  onChange={(e) =>
                    handleUpdate(item.id, "description", e.target.value)
                  }
                  rows={3}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Вэбсайтын линк
                </label>
                <input
                  type="text"
                  value={item.websiteLink}
                  onChange={(e) =>
                    handleUpdate(item.id, "websiteLink", e.target.value)
                  }
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Зураг
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, item.id)}
                  className="w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700
                    hover:file:bg-indigo-100"
                />
                {item.imageUrl && (
                  <div className="mt-2 relative h-32">
                    <Image
                      src={item.imageUrl}
                      alt="Preview"
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PDF материал
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handlePdfUpload(e, item.id)}
                  className="w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700
                    hover:file:bg-indigo-100"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setSelectedItem(item.id);
                    setPreviewMode(true);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Урьдчилан харах
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
