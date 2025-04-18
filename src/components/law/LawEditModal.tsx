"use client";

import { DynamicEditModal } from "@/components/ui/dynamic-edit-modal";
import { LawItem } from "@/lib/content/types";

interface LawEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  lawId: string;
  initialData: LawItem;
  onSave: (updatedData: Partial<LawItem>) => void;
}

export function LawEditModal({
  isOpen,
  onClose,
  lawId,
  initialData,
  onSave,
}: LawEditModalProps) {
  return (
    <DynamicEditModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Law"
      initialData={{
        title: initialData.title,
        description: initialData.description,
        websiteLink: initialData.websiteLink,
        imageUrl: initialData.imageUrl,
        pdfUrl: initialData.pdfUrl,
      }}
      onSave={(updatedData) => {
        onSave({
          title: updatedData.title,
          description: updatedData.description,
          websiteLink: updatedData.websiteLink,
          imageUrl: updatedData.imageUrl,
          pdfUrl: updatedData.pdfUrl,
        });
      }}
    />
  );
}
