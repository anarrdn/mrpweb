"use client";

import { useContent } from "@/lib/content/content.context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function EditLawPage({ params }: { params: { id: string } }) {
  const { content, updateLawSection, saveChanges } = useContent();
  const router = useRouter();
  const [law, setLaw] = useState({
    title: "",
    description: "",
    websiteLink: "",
    imageUrl: "",
    pdfUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const currentLaw = content.laws?.find((l) => l.id === params.id);
    if (currentLaw) {
      setLaw(currentLaw);
    }
  }, [content.laws, params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      updateLawSection(params.id, law);
      const result = await saveChanges();
      if (result.success) {
        router.push(`/law/${params.id}`);
      } else {
        console.error("Failed to save changes:", result.error);
      }
    } catch (error) {
      console.error("Error saving law:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Qanunni tahrirlash</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div>
          <Label htmlFor="title">Sarlavha</Label>
          <Input
            id="title"
            value={law.title}
            onChange={(e) => setLaw({ ...law, title: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Tavsif</Label>
          <Textarea
            id="description"
            value={law.description}
            onChange={(e) => setLaw({ ...law, description: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="websiteLink">Veb-sayt manzili</Label>
          <Input
            id="websiteLink"
            type="url"
            value={law.websiteLink}
            onChange={(e) => setLaw({ ...law, websiteLink: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="imageUrl">Rasm URL</Label>
          <Input
            id="imageUrl"
            type="url"
            value={law.imageUrl}
            onChange={(e) => setLaw({ ...law, imageUrl: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="pdfUrl">PDF URL</Label>
          <Input
            id="pdfUrl"
            type="url"
            value={law.pdfUrl}
            onChange={(e) => setLaw({ ...law, pdfUrl: e.target.value })}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/law/${params.id}`)}
          >
            Bekor qilish
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saqlanmoqda..." : "Saqlash"}
          </Button>
        </div>
      </form>
    </div>
  );
}
