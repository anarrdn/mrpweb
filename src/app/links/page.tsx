"use client";

import { useContent, Link } from "@/lib/content";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/lib/auth/auth.context";
import { Button } from "@/components/ui/button";
import { EditModal } from "@/components/ui/edit-modal";
import { useState } from "react";

export default function LinksPage() {
  const { content, updateContent } = useContent();
  const { isAuthenticated } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<string | null>(null);

  const handleEdit = (linkId: string) => {
    setEditingLink(linkId);
    setIsEditModalOpen(true);
  };

  const handleSave = async (updatedData: Link) => {
    if (editingLink) {
      await updateContent("links", {
        ...content.links,
        [editingLink]: updatedData,
      });
      setIsEditModalOpen(false);
      setEditingLink(null);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Links</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(content.links).map(([id, link]) => {
          const typedLink = link as Link;
          return (
            <Card key={id}>
              <CardHeader>
                <CardTitle>{typedLink.title}</CardTitle>
                <CardDescription>{typedLink.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {typedLink.image && (
                  <img
                    src={typedLink.image}
                    alt={typedLink.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                {typedLink.websiteLink && (
                  <a
                    href={typedLink.websiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Visit Website
                  </a>
                )}
                {isAuthenticated && (
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => handleEdit(id)}
                  >
                    Edit
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {isAuthenticated && editingLink && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingLink(null);
          }}
          section="links"
          initialData={content.links[editingLink]}
        />
      )}
    </div>
  );
}
