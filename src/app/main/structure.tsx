"use client";

import Image from "next/image";

interface StructureProps {
  content: {
    title?: string;
    description?: string;
    image?: string;
  };
}

export default function Structure({ content }: StructureProps) {
  const defaultStructure = {
    title: "Байгууллагын бүтэц",
    description: "Манай байгууллагын бүтэц...",
    image: null,
  };

  const structure = {
    title: content?.title || defaultStructure.title,
    description: content?.description || defaultStructure.description,
    image: content?.image || defaultStructure.image,
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="prose prose-lg">
            <p className="text-gray-600">{structure.description}</p>
          </div>
          {structure.image && (
            <div className="relative h-64 md:h-96">
              <Image
                src={structure.image}
                alt={structure.title}
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
