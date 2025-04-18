"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Label } from "./label";
import Image from "next/image";
import { X } from "lucide-react";

interface DynamicEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialData: Record<string, any>;
  onSave: (data: Record<string, any>) => void;
}

export function DynamicEditModal({
  isOpen,
  onClose,
  title,
  initialData,
  onSave,
}: DynamicEditModalProps) {
  const [editedData, setEditedData] =
    useState<Record<string, any>>(initialData);
  const [imageFiles, setImageFiles] = useState<Record<string, File | null>>({});
  const [pdfFiles, setPdfFiles] = useState<Record<string, File | null>>({});
  const [shouldDeleteImages, setShouldDeleteImages] = useState<
    Record<string, boolean>
  >({});
  const [shouldDeletePdfs, setShouldDeletePdfs] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    // Convert null values to empty strings for text inputs
    const sanitizedData = Object.entries(initialData).reduce(
      (acc, [key, value]) => {
        acc[key] = value === null ? "" : value;
        return acc;
      },
      {} as Record<string, any>
    );

    setEditedData(sanitizedData);
    setImageFiles({});
    setPdfFiles({});
    setShouldDeleteImages({});
    setShouldDeletePdfs({});
  }, [initialData]);

  const handleInputChange = (field: string, value: string) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (
    field: string,
    file: File,
    isPdf: boolean = false
  ) => {
    if (isPdf) {
      setPdfFiles((prev) => ({ ...prev, [field]: file }));
    } else {
      setImageFiles((prev) => ({ ...prev, [field]: file }));
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedData((prev) => ({
        ...prev,
        [field]: reader.result,
      }));
    };
    reader.readAsDataURL(file);
    if (isPdf) {
      setShouldDeletePdfs((prev) => ({ ...prev, [field]: false }));
    } else {
      setShouldDeleteImages((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleDeleteFile = (field: string, isPdf: boolean = false) => {
    if (isPdf) {
      setPdfFiles((prev) => ({ ...prev, [field]: null }));
      setShouldDeletePdfs((prev) => ({ ...prev, [field]: true }));
    } else {
      setImageFiles((prev) => ({ ...prev, [field]: null }));
      setShouldDeleteImages((prev) => ({ ...prev, [field]: true }));
    }
    setEditedData((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert empty strings back to null for file fields
    const finalData = Object.entries(editedData).reduce((acc, [key, value]) => {
      if (
        (key.toLowerCase().includes("image") ||
          key.toLowerCase().includes("pdf")) &&
        value === ""
      ) {
        acc[key] = null;
      } else {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    onSave(finalData);
    onClose();
  };

  const renderField = (key: string, value: any) => {
    if (key.toLowerCase().includes("pdf")) {
      return (
        <div className="space-y-2" key={key}>
          <Label htmlFor={key}>{key}</Label>
          <Input
            id={key}
            type="file"
            accept=".pdf"
            onChange={(e) =>
              e.target.files?.[0] &&
              handleFileChange(key, e.target.files[0], true)
            }
            className="mt-1"
          />
          {(pdfFiles[key] || initialData[key]) && !shouldDeletePdfs[key] && (
            <div className="mt-2 text-sm text-gray-600">
              Selected PDF: {pdfFiles[key]?.name || "Current PDF"}
            </div>
          )}
        </div>
      );
    }

    if (
      key.toLowerCase().includes("image") ||
      (typeof value === "string" &&
        (value.includes("data:image") ||
          value.endsWith(".jpg") ||
          value.endsWith(".jpeg") ||
          value.endsWith(".png") ||
          value.endsWith(".gif")))
    ) {
      return (
        <div className="space-y-2" key={key}>
          <Label htmlFor={key}>{key}</Label>
          <Input
            id={key}
            type="file"
            accept="image/*"
            onChange={(e) =>
              e.target.files?.[0] && handleFileChange(key, e.target.files[0])
            }
            className="mt-1"
          />
          {(imageFiles[key] || initialData[key]) &&
            !shouldDeleteImages[key] && (
              <div className="relative h-32 mt-2 rounded group">
                <Image
                  src={
                    imageFiles[key]
                      ? URL.createObjectURL(imageFiles[key]!)
                      : (initialData[key] as string)
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
                  onClick={() => handleDeleteFile(key)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
        </div>
      );
    }

    if (typeof value === "string" && value.length > 100) {
      return (
        <div className="space-y-2" key={key}>
          <Label htmlFor={key}>{key}</Label>
          <Textarea
            id={key}
            value={editedData[key] || ""}
            onChange={(e) => handleInputChange(key, e.target.value)}
            className="mt-1 min-h-[200px]"
          />
        </div>
      );
    }

    return (
      <div className="space-y-2" key={key}>
        <Label htmlFor={key}>{key}</Label>
        <Input
          id={key}
          value={editedData[key] || ""}
          onChange={(e) => handleInputChange(key, e.target.value)}
          className="mt-1"
        />
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(initialData).map(([key, value]) =>
            renderField(key, value)
          )}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
