"use client";

import Image from "next/image";

interface GoalProps {
  content: {
    title?: string;
    description?: string;
    image?: string;
  };
}

export default function Goal({ content }: GoalProps) {
  const defaultGoal = {
    title: "Эрхэм зорилго, зорилт",
    description:
      "Манай байгууллагын эрхэм зорилго, зорилтын талаарх мэдээлэл...",
    image: null,
  };

  const goal = {
    title: content?.title || defaultGoal.title,
    description: content?.description || defaultGoal.description,
    image: content?.image || defaultGoal.image,
  };

  return (
    <section id="goal" className="py-24 bg-white pt-32 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {goal.title}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="prose prose-lg">
            <p className="text-gray-600">{goal.description}</p>
          </div>
          {goal.image && (
            <div className="relative h-64 md:h-96">
              <Image
                src={goal.image}
                alt={goal.title}
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
