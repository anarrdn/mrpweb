import { LawItem as ContentLawItem } from "@/lib/content/types";

export interface LawItem extends ContentLawItem {}

export interface LawSectionProps {
  lawItem: LawItem;
}

export interface LawPageProps {
  params: {
    section: string;
  };
}
