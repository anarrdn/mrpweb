"use client";

import { AdminPageEditor } from "@/components/admin/AdminPageEditor";

const sectionFields = [
  {
    name: "key",
    label: "Section Key",
    type: "text" as const,
  },
  {
    name: "content",
    label: "Content",
    type: "textarea" as const,
  },
  {
    name: "order",
    label: "Order",
    type: "text" as const,
  },
  {
    name: "isActive",
    label: "Is Active",
    type: "text" as const,
  },
];

export default function SectionsEditor() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Content Sections</h1>
      <p className="text-gray-600">
        Add or edit content sections for the main page. Each section should
        have:
        <ul className="list-disc pl-4 mt-2">
          <li>A unique key (e.g., section_1, section_2)</li>
          <li>
            Content in JSON format with content, order, and isActive fields
          </li>
        </ul>
      </p>
      <AdminPageEditor
        section="settings"
        title="Add New Section"
        fields={sectionFields}
      />
    </div>
  );
}
