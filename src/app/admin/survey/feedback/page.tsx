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
    name: "content",
    label: "Агуулга",
    type: "richtext" as const,
  },
  {
    name: "status",
    label: "Төлөв",
    type: "text" as const,
  },
];

export default function FeedbackSurveyEditor() {
  return (
    <AdminPageEditor
      section="survey"
      title="Санал хүсэлт"
      fields={surveyFields}
    />
  );
}
