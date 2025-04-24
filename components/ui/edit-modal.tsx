"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Label } from "./label";
import { useContent } from "@/lib/content/content.context";
import { Content, ContentSection } from "@/lib/content/types";
import Image from "next/image";
import { X } from "lucide-react";
import { uploadImage, getValidImageUrl } from "@/lib/utils/image-upload";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: ContentSection;
  initialData: any;
}

export function EditModal({
  isOpen,
  onClose,
  section,
  initialData,
}: EditModalProps) {
  const { content, updateContent } = useContent();
  const [editedData, setEditedData] = useState<Content>(content);
  const [imageFiles, setImageFiles] = useState<Record<string, File | null>>({});
  const [shouldDeleteImages, setShouldDeleteImages] = useState<
    Record<string, boolean>
  >({});
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    setEditedData(content);
  }, [content]);

  const handleInputChange = (
    section: ContentSection,
    field: string,
    value: string
  ) => {
    setEditedData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleFileChange = async (
    section: ContentSection,
    field: string,
    file: File
  ) => {
    const key = `${section}-${field}`;
    setImageFiles((prev) => ({ ...prev, [key]: file }));
    setIsUploading(true);

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreviewUrls((prev) => ({ ...prev, [key]: previewUrl }));

    try {
      // Upload the image to the database
      const imageUrl = await uploadImage(file);

      setEditedData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: imageUrl,
        },
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
      // Clean up preview URL on error
      URL.revokeObjectURL(previewUrl);
      setPreviewUrls((prev) => {
        const { [key]: _, ...rest } = prev;
        return rest;
      });
    } finally {
      setIsUploading(false);
    }

    setShouldDeleteImages((prev) => ({ ...prev, [key]: false }));
  };

  const handleDeleteImage = (section: ContentSection, field: string) => {
    const key = `${section}-${field}`;
    setImageFiles((prev) => ({ ...prev, [key]: null }));
    setShouldDeleteImages((prev) => ({ ...prev, [key]: true }));

    // Clean up preview URL
    if (previewUrls[key]) {
      URL.revokeObjectURL(previewUrls[key]);
      setPreviewUrls((prev) => {
        const { [key]: _, ...rest } = prev;
        return rest;
      });
    }

    setEditedData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: null,
      },
    }));
  };

  const handleSave = () => {
    // Clean up all preview URLs
    Object.values(previewUrls).forEach(URL.revokeObjectURL);
    setPreviewUrls({});

    // Update each section individually
    const sectionsToUpdate = [
      "hero",
      "goal",
      "history",
      "greeting",
      "structure",
      "footer",
    ];
    sectionsToUpdate.forEach((sectionKey) => {
      const sectionData = editedData[sectionKey as ContentSection];
      if (sectionData) {
        updateContent(sectionKey as ContentSection, sectionData);
      }
    });
    onClose();
  };

  const renderSectionFields = (
    sectionKey: ContentSection,
    sectionData: any
  ) => {
    if (sectionKey === "hero") {
      return (
        <>
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={sectionData?.title || ""}
              onChange={(e) =>
                handleInputChange(sectionKey, "title", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Subtitle</Label>
            <Input
              value={sectionData?.subtitle || ""}
              onChange={(e) =>
                handleInputChange(sectionKey, "subtitle", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Background Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileChange(sectionKey, "backgroundImage", file);
              }}
              disabled={isUploading}
            />
            {isUploading && (
              <p className="text-sm text-gray-500">Uploading image...</p>
            )}
            {sectionData?.backgroundImage &&
              !shouldDeleteImages[`${sectionKey}-backgroundImage`] && (
                <div className="relative h-32 mt-2 rounded group">
                  <Image
                    src={
                      previewUrls[`${sectionKey}-backgroundImage`] ||
                      getValidImageUrl(sectionData.backgroundImage) ||
                      ""
                    }
                    alt="Preview"
                    fill
                    className="object-cover rounded"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() =>
                      handleDeleteImage(sectionKey, "backgroundImage")
                    }
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
          </div>
        </>
      );
    }

    if (sectionKey === "footer") {
      return (
        <>
          <div className="space-y-2">
            <Label>Map Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileChange(sectionKey, "mapImage", file);
              }}
              disabled={isUploading}
            />
            {isUploading && (
              <p className="text-sm text-gray-500">Uploading image...</p>
            )}
            {sectionData?.mapImage &&
              !shouldDeleteImages[`${sectionKey}-mapImage`] && (
                <div className="relative h-32 mt-2 rounded group">
                  <Image
                    src={
                      previewUrls[`${sectionKey}-mapImage`] ||
                      getValidImageUrl(sectionData.mapImage) ||
                      ""
                    }
                    alt="Map Preview"
                    fill
                    className="object-cover rounded"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDeleteImage(sectionKey, "mapImage")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
          </div>
          <div className="space-y-2">
            <Label>Address</Label>
            <Textarea
              value={sectionData?.address || ""}
              onChange={(e) =>
                handleInputChange(sectionKey, "address", e.target.value)
              }
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label>Phone 1</Label>
            <Input
              value={sectionData?.phone1 || ""}
              onChange={(e) =>
                handleInputChange(sectionKey, "phone1", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Phone 2</Label>
            <Input
              value={sectionData?.phone2 || ""}
              onChange={(e) =>
                handleInputChange(sectionKey, "phone2", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              value={sectionData?.email || ""}
              onChange={(e) =>
                handleInputChange(sectionKey, "email", e.target.value)
              }
            />
          </div>
        </>
      );
    }

    return (
      <>
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={sectionData?.title || ""}
            onChange={(e) =>
              handleInputChange(sectionKey, "title", e.target.value)
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={sectionData?.description || ""}
            onChange={(e) =>
              handleInputChange(sectionKey, "description", e.target.value)
            }
            className="min-h-[100px]"
          />
        </div>
        <div className="space-y-2">
          <Label>Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileChange(sectionKey, "image", file);
            }}
            disabled={isUploading}
          />
          {isUploading && (
            <p className="text-sm text-gray-500">Uploading image...</p>
          )}
          {sectionData?.image && !shouldDeleteImages[`${sectionKey}-image`] && (
            <div className="relative h-32 mt-2 rounded group">
              <Image
                src={
                  previewUrls[`${sectionKey}-image`] ||
                  getValidImageUrl(sectionData.image) ||
                  ""
                }
                alt="Preview"
                fill
                className="object-cover rounded"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleDeleteImage(sectionKey, "image")}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Content</DialogTitle>
        </DialogHeader>
        <div className="space-y-8">
          {["hero", "goal", "history", "greeting", "structure", "footer"].map(
            (sectionKey) => {
              const sectionData = editedData[sectionKey as ContentSection];
              return (
                <div
                  key={sectionKey}
                  className="space-y-4 p-4 border rounded-lg"
                >
                  <h3 className="text-lg font-semibold capitalize">
                    {sectionKey}
                  </h3>
                  <div className="space-y-4">
                    {renderSectionFields(
                      sectionKey as ContentSection,
                      sectionData
                    )}
                  </div>
                </div>
              );
            }
          )}
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isUploading}>
            Save All
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
