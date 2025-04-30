"use client";

import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

const healthLaws = [
  { title: "Тогтоол", href: "#" },
  { title: "Тогтоол", href: "#" },
  { title: "Тогтоол", href: "#" },
  { title: "Тогтоол", href: "#" },
  { title: "Тогтоол", href: "#" },
  { title: "Тогтоол", href: "#" },
  { title: "Тогтоол", href: "#" },
  { title: "Тогтоол", href: "#" },
  { title: "Тогтоол", href: "#" },
  { title: "Тогтоол", href: "#" },
  { title: "Тогтоол", href: "#" },
  { title: "Тогтоол", href: "#" },
];

export default function HealthLawListPage() {
  return (
    <section className="w-full flex justify-center bg-gray-50 mb-40 mt-10">
      <div className="w-full max-w-3xl bg-white rounded-sm shadow-sm ">
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
            Нүүр
          </Link>
          <Link color="inherit" href="/law">
            Хууль эрх зүй
          </Link>
          <Typography color="text.primary"> УИХ-ын тогтоол</Typography>
        </Breadcrumbs>
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          УИХ-ын тогтоол
        </h1>
        <div className="border border-gray-200 rounded-sm">
          {healthLaws.map((law, idx) => (
            <Link
              key={idx}
              href={law.href}
              className="block px-4 py-2 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors text-gray-800"
            >
              {law.title}
            </Link>
          ))}
        </div>

        <hr className="mt-2" />
      </div>
    </section>
  );
}
