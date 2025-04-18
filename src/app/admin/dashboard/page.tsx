"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { useContent, Content, SaveResult, HeroContent } from "@/lib/content";
import Logo from "@/components/main/Logo";
import Image from "next/image";
import SectionEditor from "@/components/admin/SectionEditor";
import { FooterEditor } from "@/components/admin/FooterEditor";

// Define the keys for sections managed by this dashboard
type SectionKey = keyof Omit<Content, "footer" | "laws">;

export default function AdminDashboard() {
  const { content, updateContent, saveChanges } = useContent();
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [previewUrls, setPreviewUrls] = useState<
    Record<SectionKey, string | null>
  >({
    hero: content.hero.backgroundImage || null,
    mission: content.mission.image || null,
    history: content.history.image || null,
    greeting: content.greeting.image || null,
    structure: content.structure.image || null,
  });

  useEffect(() => {
    if (saveStatus === "saved") {
      const timer = setTimeout(() => setSaveStatus("idle"), 3000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  const sections: { key: SectionKey; title: string }[] = [
    { key: "hero", title: "Hero Section" },
    { key: "mission", title: "Эрхэм зорилго зорилт" },
    { key: "history", title: "Түүхэн замнал" },
    { key: "greeting", title: "Мэндчилгээ" },
    { key: "structure", title: "Бүтэц" },
  ];

  const handleImageChange = (
    section: SectionKey,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setPreviewUrls((prev) => ({ ...prev, [section]: imageUrl }));
        if (section === "hero") {
          updateContent(section, {
            ...content[section],
            backgroundImage: imageUrl,
          });
        } else {
          updateContent(section, { ...content[section], image: imageUrl });
        }
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrls((prev) => ({ ...prev, [section]: null }));
      if (section === "hero") {
        updateContent(section, { ...content[section], backgroundImage: "" });
      } else {
        updateContent(section, { ...content[section], image: "" });
      }
    }
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      const result: SaveResult = await saveChanges();
      if (result.success) {
        setSaveStatus("saved");
      } else {
        console.error("Save failed:", result.error);
        setSaveStatus("error");
      }
    } catch (error) {
      console.error("Error during save:", error);
      setSaveStatus("error");
    }
  };

  function isHeroContent(
    section: SectionKey,
    content: Content[SectionKey]
  ): content is HeroContent {
    return section === "hero";
  }

  const renderSection = (section: SectionKey) => {
    const sectionContent = content[section];
    const titleLabel = section.charAt(0).toUpperCase() + section.slice(1);

    const isHero = isHeroContent(section, sectionContent);

    return (
      <div key={section} className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">{titleLabel} Section</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={sectionContent.title}
              onChange={(e) =>
                updateContent(section, {
                  ...sectionContent,
                  title: e.target.value,
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {isHero ? "Subtitle" : "Description"}
            </label>
            <textarea
              value={
                isHero ? sectionContent.subtitle : sectionContent.description
              }
              onChange={(e) => {
                const key = isHero ? "subtitle" : "description";
                updateContent(section, {
                  ...sectionContent,
                  [key]: e.target.value,
                });
              }}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {isHero ? "Background Image" : "Image"}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(section, e)}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {previewUrls[section] && (
              <div className="mt-2 relative h-48 border rounded-md overflow-hidden">
                <Image
                  src={previewUrls[section]!}
                  alt={`${titleLabel} Preview`}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  let buttonText = "Save Changes";
  if (saveStatus === "saving") buttonText = "Saving...";
  if (saveStatus === "saved") buttonText = "Saved!";
  if (saveStatus === "error") buttonText = "Error Saving - Retry";

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <Logo dark />
                <div>
                  <h1 className="text-2xl font-bold">
                    Монголын эм хангамжийн шинэчлэл холбоо
                  </h1>
                  <p className="text-sm text-gray-500">
                    Нийтийн үйлчилгээтэй эмийн сангийн нэгдсэн Монголын эм
                    хангамжийн шинэчлэл холбоотой 77102077 дугаарт холбогдоно уу
                  </p>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="pt-32 pb-12">
          <div className="w-full max-w-3xl mx-auto px-4">
            <div className="bg-white shadow rounded-lg p-6 space-y-8">
              {sections.map(({ key }) => renderSection(key))}

              <div className="bg-white shadow rounded-lg p-6">
                <FooterEditor />
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={saveStatus === "saving"}
                  className={`inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150 ${
                    saveStatus === "saving"
                      ? "bg-gray-400 cursor-not-allowed"
                      : saveStatus === "saved"
                      ? "bg-green-600"
                      : saveStatus === "error"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {buttonText}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
