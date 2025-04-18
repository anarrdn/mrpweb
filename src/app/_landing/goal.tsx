"use client";

import { useContent } from "@/lib/content/content.context";
import { EditButton } from "@/components/ui/edit-button";
import { EditModal } from "@/components/ui/edit-modal";
import Image from "next/image";
import { useState } from "react";

export default function Goal() {
  const { content } = useContent();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Default values if content is not loaded yet
  const goalContent = content?.goal || {
    title: "Our Goal",
    description: "Loading...",
    image: null,
  };

  return (
    <section id="goal" className="pt-40 pb-16 bg-white">
      <EditButton onClick={() => setIsEditModalOpen(true)} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {goalContent.title}
            </h2>
            <p className="text-lg text-gray-600">{goalContent.description}</p>
          </div>
          {goalContent.image && (
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src={goalContent.image}
                alt="Goal"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        section="goal"
        initialData={goalContent}
      />
    </section>
  );
}
