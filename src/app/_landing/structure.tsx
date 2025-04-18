"use client";

import { useContent } from "@/lib/content/content.context";
import Image from "next/image";

export default function Structure() {
  const { content } = useContent();

  return (
    <section id="structure" className="pt-40 pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {content.structure.title}
            </h2>
            <p className="text-lg text-gray-600">
              {content.structure.description}
            </p>
          </div>
          {content.structure.image && (
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src={content.structure.image}
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
