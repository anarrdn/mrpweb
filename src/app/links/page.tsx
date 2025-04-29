"use client";

import { useContent } from "@/lib/content/content.context";

export default function LinksPage() {
  const { content } = useContent();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Links</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(content.links || {}).map(([id, link]) => (
          <a
            key={id}
            href={link.websiteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{link.title}</h2>
            <p className="text-gray-600">{link.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
