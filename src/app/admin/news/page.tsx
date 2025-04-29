"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ContentManager from "@/components/admin/ContentManager";
import { useAuth } from "@/lib/hooks/useAuth";

export default function NewsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [content] = useState<Record<string, any>>({});

  if (isLoading || !user?.isAdmin) {
    return null;
  }

  const fields = [
    {
      name: "title",
      label: "Title",
      type: "text" as const,
    },
    {
      name: "content",
      label: "Content",
      type: "textarea" as const,
    },
    {
      name: "image",
      label: "Image",
      type: "file" as const,
    },
    {
      name: "status",
      label: "Status",
      type: "select" as const,
      options: ["draft", "published"],
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <ContentManager
        section="news"
        title="News Management"
        fields={fields}
        data={content}
        onUpdate={async () => {
          // No-op since we're not using content fetching
        }}
      />
    </div>
  );
}
