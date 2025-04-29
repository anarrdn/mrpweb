"use client";

import { useEffect, useState } from "react";
import Goal from "./goal";
import History from "./history";
import Greeting from "./greeting";
import Hero from "./hero";
import Structure from "./structure";
import { apiClient } from "@/lib/api/client";

interface Section {
  id: string;
  type: string;
  order: number;
  isActive: boolean;
  content: {
    title?: string;
    subtitle?: string;
    backgroundImage?: string;
    // Add other content types as needed
    [key: string]: any;
  };
}

export default function MainPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await apiClient.getSettings();
        console.log("Raw settings response:", response);

        // Filter out site-wide settings and empty settings
        const contentSettings = response.filter((setting: any) => {
          return (
            setting.key &&
            setting.value &&
            !["homepage_background", "site_title", "site_description"].includes(
              setting.key
            )
          );
        });

        console.log("Filtered content settings:", contentSettings);

        // Transform settings into sections
        const transformedSections = contentSettings.map((setting: any) => {
          try {
            const content = JSON.parse(setting.value);
            return {
              id: setting.id,
              type: setting.key,
              content,
              order: content.order || 0,
              isActive:
                content.isActive !== undefined ? content.isActive : true,
            };
          } catch (error) {
            console.error(`Failed to parse setting ${setting.key}:`, error);
            return {
              id: setting.id,
              type: setting.key,
              content: { text: setting.value },
              order: 0,
              isActive: true,
            };
          }
        });

        console.log("Transformed sections:", transformedSections);
        setSections(transformedSections);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    fetchSections();
  }, []);

  if (isLoading) {
    return <div className="min-h-screen bg-gray-200 animate-pulse"></div>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  // Sort sections by order
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <main className="min-h-screen relative">
      <div className="relative z-10">
        {sortedSections.map((section) => {
          if (!section.isActive) return null;

          switch (section.type) {
            case "hero":
              return <Hero key={section.id} content={section.content} />;
            case "goal":
              return <Goal key={section.id} content={section.content} />;
            case "history":
              return <History key={section.id} content={section.content} />;
            case "greeting":
              return <Greeting key={section.id} content={section.content} />;
            case "structure":
              return <Structure key={section.id} content={section.content} />;
            default:
              return null;
          }
        })}
      </div>
    </main>
  );
}
