"use client";

import { AdminPageEditor } from "@/components/admin/AdminPageEditor";

const contractFields = [
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
    name: "content",
    label: "Агуулга",
    type: "richtext" as const,
  },
  {
    name: "fileUrl",
    label: "Файлын холбоос",
    type: "text" as const,
  },
  {
    name: "category",
    label: "Ангилал",
    type: "text" as const,
  },
  {
    name: "status",
    label: "Төлөв",
    type: "text" as const,
  },
];

export default function StandardsContractEditor() {
  return (
    <AdminPageEditor
      section="contract"
      title="Стандарт"
      fields={contractFields}
    />
  );
}
