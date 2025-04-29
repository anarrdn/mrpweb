"use client";

import { useState } from "react";
import { apiClient } from "@/lib/api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FooterCreateRequest } from "@/lib/api/types";

type SectionType =
  | "hero"
  | "footer"
  | "settings"
  | "news"
  | "laws"
  | "links"
  | "survey"
  | "contract";

interface AdminPageEditorProps {
  section: SectionType;
  title: string;
  fields: {
    name: string;
    label: string;
    type: "text" | "textarea" | "image" | "richtext";
  }[];
}

export function AdminPageEditor({
  section,
  title,
  fields,
}: AdminPageEditorProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = async (field: string, file: File) => {
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await apiClient.uploadFile(file);
      handleChange(field, response);
      toast.success("File uploaded successfully");
    } catch (error) {
      console.error("Failed to upload file:", error);
      toast.error("Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      switch (section) {
        case "hero":
          await apiClient.createBanner({
            title: formData.title,
            subtitle: formData.subtitle,
            backgroundImage: formData.backgroundImage,
          });
          break;
        case "footer":
          const footerData: FooterCreateRequest = {
            title: formData.title || "",
            mapImage: formData.mapImage,
            address: formData.address,
            phone: formData.phone,
            email: formData.email,
            socialLinks: formData.socialLinks
              ? JSON.parse(formData.socialLinks)
              : [],
            copyright: formData.copyright,
            links: formData.links ? JSON.parse(formData.links) : [],
          };
          await apiClient.createFooterSection(footerData);
          break;
        case "settings":
          const settingsToUpdate = Object.entries(formData).map(
            ([key, value]) => ({
              key: `settings.${key}`,
              value: typeof value === "string" ? value : JSON.stringify(value),
            })
          );
          await apiClient.updateSettings(settingsToUpdate);
          break;
        default:
          const sectionData = [
            {
              key: section,
              value: JSON.stringify(formData),
            },
          ];
          await apiClient.updateSettings(sectionData);
      }
      toast.success("Content updated successfully");
    } catch (error) {
      console.error("Failed to update content:", error);
      toast.error("Failed to update content");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>{field.label}</Label>
              {field.type === "textarea" ? (
                <Textarea
                  id={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              ) : field.type === "image" ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(field.name, file);
                    }}
                  />
                  {uploading && <Upload className="animate-spin" />}
                </div>
              ) : (
                <Input
                  id={field.name}
                  type="text"
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              )}
            </div>
          ))}
          <Button onClick={handleSubmit}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}
