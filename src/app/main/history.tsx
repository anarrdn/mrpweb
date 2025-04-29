"use client";

import Image from "next/image";

interface HistoryProps {
  content: {
    title?: string;
    description?: string;
    image?: string;
  };
}

export default function History({ content }: HistoryProps) {
  const defaultHistory = {
    title: "Түүхэн замнал",
    description: "Манай байгууллагын түүхэн замналын талаарх мэдээлэл...",
    image: null,
  };

  const history = {
    title: content?.title || defaultHistory.title,
    description: content?.description || defaultHistory.description,
    image: content?.image || defaultHistory.image,
  };

  return (
    <section id="history" className="py-24 bg-gray-50 pt-32 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {history.title}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="prose prose-lg">
            <p className="text-gray-600">{history.description}</p>
          </div>
          {history.image && (
            <div className="relative h-64 md:h-96">
              <Image
                src={history.image}
                alt={history.title}
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
