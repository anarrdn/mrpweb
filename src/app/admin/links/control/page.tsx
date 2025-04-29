"use client";

import { AdminPageEditor } from "@/components/admin/AdminPageEditor";

const linkFields = [
  {
    name: "title",
    label: "Гарчиг",
    type: "text" as const,
  },
  {
    name: "description",
    label: "Тайлбар",
    type: "textarea" as const,
  },
  {
    name: "websiteLink",
    label: "Вэбсайт холбоос",
    type: "text" as const,
  },
  {
    name: "image",
    label: "Зураг",
    type: "image" as const,
  },
];

export default function ControlLinksEditor() {
  return (
    <AdminPageEditor
      section="links"
      title="Хяналт шалгалт"
      fields={linkFields}
    />
  );
}
