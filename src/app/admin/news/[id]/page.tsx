"use client";

import { useParams } from "next/navigation";
import { AdminPageEditor } from "@/components/admin/AdminPageEditor";

const newsFields = [
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
    name: "imageUrl",
    label: "Зураг",
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

export default function NewsEditor() {
  const params = useParams<{ id: string }>();
  return (
    <AdminPageEditor section="news" title={params.id} fields={newsFields} />
  );
}
