"use client";

import { AdminPageEditor } from "@/components/admin/AdminPageEditor";

const reportFields = [
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
    name: "status",
    label: "Төлөв",
    type: "text" as const,
  },
];

export default function ReportsContractEditor() {
  return (
    <AdminPageEditor section="contract" title="Тайлан" fields={reportFields} />
  );
}
