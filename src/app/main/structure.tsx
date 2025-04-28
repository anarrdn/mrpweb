"use client";

import { useContent } from "@/lib/content/content.context";
import Image from "next/image";

export default function Structure() {
  const { content } = useContent();

  const structure = content?.structure || {
    title: "Байгууллагын бүтэц",
    description: "Манай байгууллагын бүтэц...",
    image: null,
  };

  return (
    <section id="structure" className="py-24 bg-gray-50 pt-32 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {structure.title}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <div
          className={`grid ${
            structure.image
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 max-w-3xl mx-auto"
          } gap-16 items-center`}
        >
          <div className="space-y-8">
            <div className="prose prose-lg text-gray-600">
              {structure.description.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-6 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          {structure.image && (
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={structure.image}
                alt="Structure"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
