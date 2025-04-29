"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ContentContextType {
  content: Record<string, any>;
  updateContent: (section: string, data: any) => Promise<void>;
  isLoading: boolean;
}

const defaultContent = {
  hero: {
    title: "Welcome to Medtech MRP",
    subtitle: "Your Medical Resource Planning Solution",
    backgroundImage: "/branding/consultation.jpg",
  },
  landing: {
    title: "МОНГОЛЫН ЭМ ХАНГАМЖИЙН ШИНЭЧЛЭЛ ХОЛБОО",
    subtitle:
      "НИЙТИЙН ҮЙЛЧИЛГЭЭТЭЙ ЭМИЙН САНГУУДЫН НЭГДСЭН ГИШҮҮДДЭЭ ҮЙЛЧИЛДЭГ ТӨРИЙН БУС БАЙГУУЛЛАГА",
    backgroundImage: "/branding/consultation.jpg",
  },
  stats: {
    news: 0,
    links: 0,
    laws: 0,
    users: 0,
    documents: 0,
    media: 0,
  },
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content] = useState<Record<string, any>>(defaultContent);
  const [isLoading] = useState(false);

  const updateContent = async (section: string, data: any) => {
    // No-op since we're not using content fetching
    return Promise.resolve();
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        updateContent,
        isLoading,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
}
