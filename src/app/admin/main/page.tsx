// "use client";

// import { AdminPageEditor } from "@/components/admin/AdminPageEditor";

// const mainSections = [
//   {
//     title: "Hero Section",
//     section: "hero",
//     fields: [
//       {
//         name: "title",
//         label: "Гарчиг",
//         type: "text" as const,
//       },
//       {
//         name: "subtitle",
//         label: "Дэд гарчиг",
//         type: "textarea" as const,
//       },
//       {
//         name: "backgroundImage",
//         label: "Ар талын зураг",
//         type: "image" as const,
//       },
//     ],
//   },
//   {
//     title: "Greeting Section",
//     section: "greeting",
//     fields: [
//       {
//         name: "title",
//         label: "Гарчиг",
//         type: "text" as const,
//       },
//       {
//         name: "description",
//         label: "Тайлбар",
//         type: "richtext" as const,
//       },
//       {
//         name: "image",
//         label: "Зураг",
//         type: "image" as const,
//       },
//     ],
//   },
//   {
//     title: "Goal Section",
//     section: "goal",
//     fields: [
//       {
//         name: "title",
//         label: "Гарчиг",
//         type: "text" as const,
//       },
//       {
//         name: "description",
//         label: "Тайлбар",
//         type: "richtext" as const,
//       },
//       {
//         name: "image",
//         label: "Зураг",
//         type: "image" as const,
//       },
//     ],
//   },
//   {
//     title: "History Section",
//     section: "history",
//     fields: [
//       {
//         name: "title",
//         label: "Гарчиг",
//         type: "text" as const,
//       },
//       {
//         name: "description",
//         label: "Тайлбар",
//         type: "richtext" as const,
//       },
//       {
//         name: "image",
//         label: "Зураг",
//         type: "image" as const,
//       },
//     ],
//   },
//   {
//     title: "Structure Section",
//     section: "structure",
//     fields: [
//       {
//         name: "title",
//         label: "Гарчиг",
//         type: "text" as const,
//       },
//       {
//         name: "description",
//         label: "Тайлбар",
//         type: "richtext" as const,
//       },
//       {
//         name: "image",
//         label: "Зураг",
//         type: "image" as const,
//       },
//     ],
//   },
// ];

// export default function MainPageEditor() {
//   return (
//     <div className="space-y-8">
//       {mainSections.map((section) => (
//         <div key={section.section} className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
//           <AdminPageEditor
//             // section={`main.${section.section}`}
//             title={section.title}
//             fields={section.fields}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }
