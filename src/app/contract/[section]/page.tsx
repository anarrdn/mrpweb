"use client";

import { useParams } from "next/navigation";
import { useContent } from "@/lib/content/content.context";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ContractPage() {
  const params = useParams<{ section: string }>();
  const { content } = useContent();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get the contract content for the current section
  const contractContent = content.contract?.[params.section] || {
    title: "Loading...",
    description: "Loading...",
    image: null,
    pdf: null,
    link: null,
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{contractContent.title}</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-8">{contractContent.description}</p>
        </div>

        {contractContent.image && (
          <div className="mb-8">
            <Image
              src={contractContent.image}
              alt={contractContent.title}
              width={800}
              height={450}
              className="rounded-lg shadow-lg"
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {contractContent.link && (
            <Button
              variant="default"
              className="w-full sm:w-auto px-6 py-3 text-lg"
              onClick={() =>
                contractContent.link &&
                window.open(contractContent.link, "_blank")
              }
            >
              Вэбсайт руу очих
            </Button>
          )}
          {contractContent.pdf && (
            <Button
              variant="outline"
              className="w-full sm:w-auto px-6 py-3 text-lg"
              onClick={() =>
                contractContent.pdf &&
                window.open(contractContent.pdf, "_blank")
              }
            >
              PDF файл татах
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
