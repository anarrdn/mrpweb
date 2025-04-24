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
import { api } from "@/lib/api/client";
import { toast } from "sonner";

interface ContentContextType {
  content: Content;
  updateContent: (
    section: ContentSection,
    data: Content[ContentSection]
  ) => Promise<void>;
  isLoading: boolean;
  updateLawSection: (lawId: string, data: Partial<LawItem>) => Promise<void>;
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
      youtube: null,
    },
    manage: {
      title: "Монгол улсын стандарт",
      description: "Монгол улсын стандартын судалгаа, санал асуулга",
      image: null,
      pdf: null,
      link: null,
      youtube: null,
    },
    participate: {
      title: "Судалгаанд оролцох",
      description: "Судалгаанд оролцох мэдээлэл",
      image: null,
      pdf: null,
      link: null,
      youtube: null,
    },
    feedback: {
      title: "Саналаа өгөх",
      description: "Санал хүсэлт өгөх",
      image: null,
      pdf: null,
      link: null,
      youtube: null,
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

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Content>(initialContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await api.getContent();
      setContent(response.data as Content);
    } catch (error) {
      console.error("Error fetching content:", error);
      toast.error("Failed to load content");
    } finally {
      setIsLoading(false);
    }
  };

  const updateContent = async (
    section: ContentSection,
    data: Content[ContentSection]
  ) => {
    try {
      const response = await api.updateContent(section, data);
      setContent(response.data as Content);
      toast.success("Content updated successfully");
    } catch (error) {
      console.error("Error updating content:", error);
      toast.error("Failed to update content");
      throw error;
    }
  };

  const updateLawSection = async (lawId: string, data: Partial<LawItem>) => {
    try {
      const response = await api.updateLawContent(lawId, data);
      setContent(response.data as Content);
      toast.success("Law section updated successfully");
    } catch (error) {
      console.error("Error updating law section:", error);
      toast.error("Failed to update law section");
      throw error;
    }
  };

  const getLawSection = (lawId: string): LawItem | undefined => {
    const currentLaws = content.laws || [];
    return currentLaws.find((law) => law.id === lawId);
  };

  const saveChanges = async (): Promise<SaveResult> => {
    try {
      // Since we're now saving to the backend immediately on each update,
      // this function is mostly for backward compatibility
      return { success: true };
    } catch (error) {
      console.error("Error saving changes:", error);
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
