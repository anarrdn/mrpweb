"use client";

import { AdminPageEditor } from "@/components/admin/AdminPageEditor";
import { useParams } from "next/navigation";

const lawFields = [
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

const sectionTitles: Record<string, string> = {
  law: "Монгол улсын хууль",
  parliament: "УИХ-ын тогтоол",
  government: "Засгийн газрын тогтоол",
  "health-minister": "Эрүүл мэндийн сайдын тушаал",
  emdz: "ЭМДҮЗ-ийн тогтоол",
  emdeg: "ЭМДЕГ-ын даргын тушаал",
  other: "Бусад эрх зүйн акт",
};

export default function LawSectionEditor() {
  const params = useParams();
  const section = params.section as string;
  const title = sectionTitles[section] || "Хууль засварлах";

  return (
    <AdminPageEditor
      section={`laws.${section}`}
      title={title}
      fields={lawFields}
    />
  );
}
