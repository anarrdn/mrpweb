import { useState } from "react";
import Image from "next/image";
import { useContent } from "@/lib/content/content.context";

type SectionKey = "hero" | "mission" | "history" | "greeting" | "structure";

type HeroContent = {
  title: string;
  subtitle: string;
  backgroundImage?: string;
};

type OtherContent = {
  title: string;
  description: string;
  image?: string;
};

type Content = {
  hero: HeroContent;
  mission: OtherContent;
  history: OtherContent;
  greeting: OtherContent;
  structure: OtherContent;
};

interface SectionEditorProps {
  section: SectionKey;
  title: string;
  previewUrls: Record<SectionKey, string | null>;
  setPreviewUrls: React.Dispatch<
    React.SetStateAction<Record<SectionKey, string | null>>
  >;
}

export default function SectionEditor({
  section,
  title,
  previewUrls,
  setPreviewUrls,
}: SectionEditorProps) {
  const { content, updateContent } = useContent();
  const sectionContent = content[section];
  const isHero = section === "hero";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrls((prev) => ({
          ...prev,
          [section]: reader.result as string,
        }));
        if (section === "hero") {
          updateContent(section, { backgroundImage: reader.result as string });
        } else {
          updateContent(section, { image: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">{title}</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={sectionContent.title}
            onChange={(e) => updateContent(section, { title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {isHero ? "Subtitle" : "Description"}
          </label>
          <textarea
            value={
              isHero
                ? (sectionContent as HeroContent).subtitle
                : (sectionContent as OtherContent).description
            }
            onChange={(e) =>
              updateContent(section, {
                [isHero ? "subtitle" : "description"]: e.target.value,
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            rows={5}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {isHero ? "Background Image" : "Image"}
          </label>
          <div className="mt-1 flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
            {(previewUrls[section] ||
              (isHero
                ? (sectionContent as HeroContent).backgroundImage
                : (sectionContent as OtherContent).image)) && (
              <div className="relative w-32 h-32">
                <Image
                  src={
                    previewUrls[section] ||
                    (isHero
                      ? (sectionContent as HeroContent).backgroundImage
                      : (sectionContent as OtherContent).image) ||
                    ""
                  }
                  alt="Preview"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
