"use client";

import { useContent } from "@/lib/content/content.context";
import Image from "next/image";

export default function Greeting() {
  const { content } = useContent();

  return (
    <section id="greeting" className="py-24 bg-white pt-32 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {content.greeting.title}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <div
          className={`grid ${
            content.greeting.image
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 max-w-3xl mx-auto"
          } gap-16 items-center`}
        >
          {content.greeting.image && (
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={content.greeting.image}
                alt="Greeting"
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="space-y-8">
            <div className="prose prose-lg text-gray-600">
              {content.greeting.description
                .split("\n")
                .map((paragraph, index) => (
                  <p key={index} className="mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
