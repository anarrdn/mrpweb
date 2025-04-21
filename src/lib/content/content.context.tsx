"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  Content,
  FooterContent,
  LawItem,
  MissionContent,
  GreetingContent,
  HeroContent,
  HistoryContent,
  StructureContent,
  SaveResult,
  ContentSection,
  PageContent,
} from "./types";

interface ContentContextType {
  content: Content;
  updateContent: (
    section: ContentSection,
    data: Content[ContentSection]
  ) => void;
  isLoading: boolean;
  updateLawSection: (lawId: string, data: Partial<LawItem>) => void;
  getLawSection: (lawId: string) => LawItem | undefined;
  saveChanges: () => Promise<SaveResult>;
}

const defaultFooter: FooterContent = {
  title: "Монголын эм хангамжийн шинэчлэл холбоо",
  address: "Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, Сүхбаатарын талбай",
  phone1: "976-11-319177",
  phone2: "976-11-319178",
  email: "info@mlsp.mn",
  mapImage: "",
};

const initialLinks = {
  ministry: {
    title: "Эрүүл мэндийн яам",
    description: "Монгол улсын эрүүл мэндийн яамны албан ёсны вэбсайт",
    image: "/images/links/ministry.jpg",
    websiteLink: "https://www.mohs.mn",
  },
  control: {
    title: "Эм эмнэлгийн хэрэгслийн хяналт зохицуулалтын газар",
    description:
      "Эм эмнэлгийн хэрэгслийн хяналт зохицуулалтын газрын албан ёсны вэбсайт",
    image: "/images/links/control.jpg",
    websiteLink: "https://www.emdz.mn",
  },
  health: {
    title: "Эрүүл мэндийн газар",
    description: "Эрүүл мэндийн газрын албан ёсны вэбсайт",
    image: "/images/links/health.jpg",
    websiteLink: "https://www.health.mn",
  },
  union: {
    title: "Үйлдвэрчний эвлэлийн холбоо",
    description: "Үйлдвэрчний эвлэлийн холбооны албан ёсны вэбсайт",
    image: "/images/links/union.jpg",
    websiteLink: "https://www.union.mn",
  },
  consumer: {
    title: "Хэрэглэгчийн эрх ашгийг хамгаалах нийгэмлэг",
    description:
      "Хэрэглэгчийн эрх ашгийг хамгаалах нийгэмлэгийн албан ёсны вэбсайт",
    image: "/images/links/consumer.jpg",
    websiteLink: "https://www.consumer.mn",
  },
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

const defaultMission: MissionContent = {
  title: "Эрхэм зорилго зорилт",
  description: "Манай байгууллагын эрхэм зорилго бол...",
  image: "",
};

const defaultGreeting: GreetingContent = {
  title: "Мэндчилгээ",
  description: "Манай байгууллагын мэндчилгээ...",
  image: "",
};

const defaultHero: HeroContent = {
  title: "монголын эм хангамжийн шинэчлэл холбоо",
  subtitle: "",
  backgroundImage: null,
};

const defaultHistory: HistoryContent = {
  title: "Түүхэн замнал",
  description: "Манай байгууллагын түүх...",
  image: "",
};

const defaultStructure: StructureContent = {
  title: "Бүтэц",
  description: "Манай байгууллагын бүтэц...",
  image: "",
};

const initialContent: Content = {
  footer: defaultFooter,
  laws: initialLawItems,
  mission: defaultMission,
  greeting: defaultGreeting,
  hero: defaultHero,
  history: defaultHistory,
  structure: defaultStructure,
  news: {},
  links: initialLinks,
  goal: {
    title: "Эрхэм зорилго, зорилт",
    description: "Loading...",
    image: null,
  },
  survey: {
    create: {
      title: "Хууль эрх зүй",
      description: "Хууль эрх зүйн судалгаа, санал асуулга",
      image: null,
      pdf: null,
      link: null,
    },
    manage: {
      title: "Монгол улсын стандарт",
      description: "Монгол улсын стандартын судалгаа, санал асуулга",
      image: null,
      pdf: null,
      link: null,
    },
    participate: {
      title: "Судалгаанд оролцох",
      description: "Судалгаанд оролцох мэдээлэл",
      image: null,
      pdf: null,
      link: null,
    },
    feedback: {
      title: "Саналаа өгөх",
      description: "Санал хүсэлт өгөх",
      image: null,
      pdf: null,
      link: null,
    },
  },
  contract: {
    create: {
      title: "Эмийн сан",
      description: "Эмийн сангийн гэрээт байгууллага",
      image: null,
      pdf: null,
      link: null,
    },
    manage: {
      title: "Ажлын хувцасны үйлдвэр ба дэлгүүр",
      description: "Ажлын хувцасны үйлдвэр ба дэлгүүрийн гэрээт байгууллага",
      image: null,
      pdf: null,
      link: null,
    },
    equipment: {
      title: "Ажлын байрны тоног төхөөрөмж, тавилга",
      description: "Ажлын байрны тоног төхөөрөмж, тавилгын гэрээт байгууллага",
      image: null,
      pdf: null,
      link: null,
    },
    finance: {
      title: "Санхүүгийн үйлчилгээ үзүүлэх байгууллагууд",
      description: "Санхүүгийн үйлчилгээ үзүүлэх гэрээт байгууллагууд",
      image: null,
      pdf: null,
      link: null,
    },
    register: {
      title: "Анхан шатны бүртгэл",
      description: "Анхан шатны бүртгэлийн гэрээт байгууллага",
      image: null,
      pdf: null,
      link: null,
    },
  },
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CONTENT: "content",
  LAWS: "laws",
  NEWS: "news",
  SETTINGS: "settings",
};

// Function to check if a string is a base64 image
function isBase64Image(str: string) {
  return str.startsWith("data:image");
}

// Function to clean data before storage
function cleanDataForStorage(data: any): any {
  if (typeof data !== "object" || data === null) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(cleanDataForStorage);
  }

  return Object.entries(data).reduce((acc, [key, value]) => {
    if (typeof value === "string" && isBase64Image(value)) {
      // For base64 images, store a placeholder
      acc[key] = "image_placeholder";
    } else if (typeof value === "object" && value !== null) {
      acc[key] = cleanDataForStorage(value);
    } else {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Content>(initialContent);
  const [isLoading, setIsLoading] = useState(true);

  // Load content from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedContent = localStorage.getItem(STORAGE_KEYS.CONTENT);
        if (savedContent) {
          const parsedContent = JSON.parse(savedContent);
          // Merge with initial content, ensuring laws is always an array
          const mergedContent = {
            ...initialContent,
            ...parsedContent,
            laws:
              Array.isArray(parsedContent.laws) && parsedContent.laws.length > 0
                ? parsedContent.laws
                : initialLawItems,
          };
          setContent(mergedContent);
        }
      } catch (error) {
        console.error("Error loading content:", error);
        setContent(initialContent);
      }
    }
    setIsLoading(false);
  }, []);

  const updateContent = (
    section: ContentSection,
    data: Content[ContentSection]
  ) => {
    setContent((prev) => {
      const newContent = {
        ...prev,
        [section]: data,
        laws: section === "laws" && Array.isArray(data) ? data : prev.laws,
      };

      // Clean data before saving to localStorage
      const cleanedContent = cleanDataForStorage(newContent);

      // Save to localStorage
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(
            STORAGE_KEYS.CONTENT,
            JSON.stringify(cleanedContent)
          );
        } catch (error) {
          console.error("Error saving content:", error);
          // If storage fails, at least keep the content in state
        }
      }

      return newContent;
    });
  };

  const updateLawSection = (lawId: string, data: Partial<LawItem>) => {
    setContent((prev) => {
      // Ensure laws array exists
      const currentLaws = prev.laws || [];
      const updatedLaws = currentLaws.map((law) =>
        law.id === lawId ? { ...law, ...data } : law
      );
      const newContent = { ...prev, laws: updatedLaws };

      // Save to localStorage immediately
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(
            STORAGE_KEYS.CONTENT,
            JSON.stringify(newContent)
          );
        } catch (error) {
          console.error("Error saving law data:", error);
        }
      }

      return newContent;
    });
  };

  const getLawSection = (lawId: string): LawItem | undefined => {
    // Ensure laws array exists
    const currentLaws = content.laws || [];
    return currentLaws.find((law) => law.id === lawId);
  };

  const saveChanges = async (): Promise<SaveResult> => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("content", JSON.stringify(content));
        return { success: true };
      }
      return { success: false, error: "Window is not defined" };
    } catch (error) {
      console.error("Error saving content:", error);
      return { success: false, error: String(error) };
    }
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        updateContent,
        isLoading,
        updateLawSection,
        getLawSection,
        saveChanges,
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
