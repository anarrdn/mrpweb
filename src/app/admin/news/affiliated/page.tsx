"use client";

import { AdminPageEditor } from "@/components/admin/AdminPageEditor";

const newsFields = [
  {
    name: "title",
    label: "Гарчиг",
    type: "text" as const,
  },
  {
    name: "content",
    label: "Агуулга",
    type: "textarea" as const,
  },
  {
    name: "image",
    label: "Зураг",
    type: "image" as const,
  },
  {
    name: "date",
    label: "Огноо",
    type: "text" as const,
  },
  {
    name: "status",
    label: "Төлөв",
    type: "text" as const,
  },
];

export default function AffiliatedNewsEditor() {
  return (
    <AdminPageEditor
      section="news"
      title="Хамааралтай байгууллагууд"
      fields={newsFields}
    />
  );
}
