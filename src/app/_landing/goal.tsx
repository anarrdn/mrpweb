"use client";

import { useContent } from "@/lib/content/content.context";
import Image from "next/image";

export default function Goal() {
  const { content } = useContent();

  return (
    <section id="goal" className="py-24 bg-white pt-32 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {content.goal.title}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <div
          className={`grid ${
            content.goal.image
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 max-w-3xl mx-auto"
          } gap-16 items-center`}
        >
          <div className="space-y-6">
            <p className="text-gray-600 leading-relaxed text-lg">
              {content.goal.description}
            </p>
          </div>
          {content.goal.image && (
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={content.goal.image}
                alt="Goal"
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
