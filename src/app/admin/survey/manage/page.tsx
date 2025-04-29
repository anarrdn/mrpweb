"use client";

import { AdminPageEditor } from "@/components/admin/AdminPageEditor";

const surveyFields = [
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
    name: "questions",
    label: "Асуултууд",
    type: "textarea" as const,
  },
  {
    name: "status",
    label: "Төлөв",
    type: "text" as const,
  },
];

export default function ManageSurveyEditor() {
  return (
    <AdminPageEditor
      section="survey"
      title="Судалгаа удирдах"
      fields={surveyFields}
    />
  );
}
