"use client";

import { useParams } from "next/navigation";
import { useContent } from "@/lib/content/content.context";
import { LawSection } from "@/components/law/LawSection";
import { LawItem } from "@/lib/content/types";

export default function LawPage() {
  const params = useParams<{ section: string }>();
  const { content } = useContent();
  const lawItem = content.laws.find((law) => law.id === params.section);

  if (!lawItem) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Хууль олдсонгүй</h1>
          <p className="mt-2 text-gray-600">
            Уучлаарай, хайсан хууль олдсонгүй.
          </p>
        </div>
      </div>
    );
  }

  return <LawSection lawItem={lawItem} />;
}
