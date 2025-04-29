"use client";

import { AdminPageEditor } from "@/components/admin/AdminPageEditor";

const landingFields = [
  {
    name: "title",
    label: "Гарчиг",
    type: "text" as const,
  },
  {
    name: "subtitle",
    label: "Дэд гарчиг",
    type: "textarea" as const,
  },
  {
    name: "backgroundImage",
    label: "Ар талын зураг",
    type: "image" as const,
  },
];

export default function LandingEditor() {
  return (
    <AdminPageEditor
      section="landing"
      title="Нүүр хуудас"
      fields={landingFields}
    />
  );
}
