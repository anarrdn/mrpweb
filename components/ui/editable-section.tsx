"use client";

import { useState } from "react";
import { useContent } from "@/lib/content/content.context";
import { EditButton } from "./edit-button";
import { EditModal } from "./edit-modal";
import Image from "next/image";
import { ContentSection } from "@/lib/content/types";

interface EditableSectionProps {
  section: ContentSection;
  children: (content: any) => React.ReactNode;
}

export function EditableSection({ section, children }: EditableSectionProps) {
  const { content } = useContent();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="relative">
      <EditButton onClick={() => setIsEditModalOpen(true)} />
      {children(content[section])}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        section={section}
        initialData={content[section]}
      />
    </div>
  );
}
