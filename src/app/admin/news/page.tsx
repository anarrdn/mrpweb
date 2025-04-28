"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api/client";
import ContentManager from "@/components/admin/ContentManager";
import { useAuth } from "@/lib/hooks/useAuth";

export default function NewsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [content, setContent] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!isLoading && !user?.isAdmin) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await apiClient.getContent();
        setContent(data.news || {});
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    fetchContent();
  }, []);

  if (isLoading || !user?.isAdmin) {
    return null;
  }

  const fields = [
    {
      name: "title",
      label: "Title",
      type: "text",
    },
    {
      name: "content",
      label: "Content",
      type: "textarea",
    },
    {
      name: "image",
      label: "Image",
      type: "file",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
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
          const data = await apiClient.getContent();
          setContent(data.news || {});
        }}
      />
    </div>
  );
}
