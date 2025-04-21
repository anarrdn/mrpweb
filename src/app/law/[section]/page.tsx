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
      <section className="py-24 bg-white pt-40 scroll-mt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Хууль олдсонгүй
            </h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              Уучлаарай, хайсан хууль олдсонгүй.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return <LawSection lawItem={lawItem} />;
}
