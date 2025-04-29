"use client";

import Image from "next/image";

interface GreetingProps {
  content: {
    title?: string;
    description?: string;
    image?: string;
  };
}

export default function Greeting({ content }: GreetingProps) {
  const defaultGreeting = {
    title: "Мэндчилгээ",
    description: "Манай байгууллагын мэндчилгээ...",
    image: null,
  };

  const greeting = {
    title: content?.title || defaultGreeting.title,
    description: content?.description || defaultGreeting.description,
    image: content?.image || defaultGreeting.image,
  };

  return (
    <section id="greeting" className="py-24 bg-white pt-32 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {greeting.title}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="prose prose-lg">
            <p className="text-gray-600">{greeting.description}</p>
          </div>
          {greeting.image && (
            <div className="relative h-64 md:h-96">
              <Image
                src={greeting.image}
                alt={greeting.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
