export interface MapCoordinates {
  lat: number;
  lng: number;
}

export interface FooterContent {
  title: string;
  address: string;
  phone1: string;
  phone2: string;
  email: string;
  mapImage: string;
}

export interface LawItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  pdfUrl: string;
  websiteLink: string;
}

export interface MissionContent {
  title: string;
  description: string;
  image: string;
}

export interface GreetingContent {
  title: string;
  description: string;
  image: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  backgroundImage: string | null;
}

export interface HistoryContent {
  title: string;
  description: string;
  image: string;
}

export interface StructureContent {
  title: string;
  description: string;
  image: string;
}

export interface NewsContent {
  title: string;
  description: string;
  image: string | null;
  pdf: string | null;
  link: string | null;
  youtube: string | null;
}

export interface Link {
  title: string;
  description: string;
  image?: string;
  websiteLink?: string;
  pdfUrl?: string;
  youtube?: string;
}

export interface PageContent {
  footer: FooterContent;
  laws: LawItem[];
  mission: MissionContent;
  greeting: GreetingContent;
  hero: HeroContent;
  history: HistoryContent;
  structure: StructureContent;
  news: {
    [key: string]: NewsContent;
  };
  links: {
    [key: string]: Link;
  };
  goal: {
    title: string;
    description: string;
    image: string | null;
  };
  survey: {
    [key: string]: {
      title: string;
      description: string;
      image: string | null;
      pdf: string | null;
      link: string | null;
      youtube: string | null;
    };
  };
  contract: {
    [key: string]: {
      title: string;
      description: string;
      image: string | null;
      pdf: string | null;
      link: string | null;
    };
  };
}

export type Content = PageContent;

export type ContentSection = keyof Content;

export interface SaveResult {
  success: boolean;
  error?: string;
}

export interface ContentContextType {
  content: Content;
  updateContent: (section: keyof Content, data: any) => void;
  updateLawSection: (lawId: string, data: Partial<LawItem>) => void;
  getLawSection: (lawId: string) => LawItem | undefined;
  saveChanges: () => Promise<SaveResult>;
}
