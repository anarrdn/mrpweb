"use client";

import { AdminPageEditor } from "@/components/admin/AdminPageEditor";
import { useParams } from "next/navigation";

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

const sectionTitles: Record<string, string> = {
  ministry: "Эрүүл мэндийн яам",
  control: "Эм эмнэлгийн хэрэгслийн хяналт зохицуулалтын газар",
  health: "Эрүүл мэндийн газар",
  union: "Үйлдвэрчний эвлэлийн холбоо",
  consumer: "Хэрэглэгчийн эрх ашгийг хамгаалах нийгэмлэг",
};

export default function LinkSectionEditor() {
  const params = useParams();
  const section = params.section as string;
  const title = sectionTitles[section] || "Холбоос засварлах";

  return (
    <AdminPageEditor
      section={`links.${section}`}
      title={title}
      fields={linkFields}
    />
  );
}
