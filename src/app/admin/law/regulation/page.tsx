"use client";

import { AdminPageEditor } from "@/components/admin/AdminPageEditor";

const regulationFields = [
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
    type: "textarea" as const,
  },
  {
    name: "category",
    label: "Ангилал",
    type: "text" as const,
  },
  {
    name: "fileUrl",
    label: "Файл",
    type: "image" as const,
  },
];

export default function RegulationEditor() {
  return (
    <AdminPageEditor section="laws" title="Журам" fields={regulationFields} />
  );
}
