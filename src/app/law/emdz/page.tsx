"use client";

import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

const healthLaws = [
  { title: "Сайдын тушаал 2025 он", href: "#" },
  { title: "Сайдын тушаал 2024 он", href: "#" },
  { title: "Сайдын тушаал 2023 он", href: "#" },
  { title: "Сайдын тушаал 2022 он", href: "#" },
  { title: "Сайдын тушаал 2021 он", href: "#" },
  { title: "Сайдын тушаал 2020 он", href: "#" },
  { title: "Сайдын тушаал 2019 он", href: "#" },
  { title: "Сайдын тушаал 2018 он", href: "#" },
  { title: "Сайдын тушаал 2017 он", href: "#" },
  { title: "Сайдын тушаал 2016 он", href: "#" },
  { title: "Сайдын тушаал 2015 он", href: "#" },
  { title: "Сайдын тушаал архив", href: "#" },
];

export default function HealthLawListPage() {
  return (
    <section className="w-full flex justify-center bg-gray-50 mb-40 mt-10">
      <div className="w-full max-w-3xl bg-white rounded-sm shadow-sm ">
        <Breadcrumbs aria-label="breadcrumb" className="text-sm">
          <Link color="inherit" href="/" className="text-sm">
            Нүүр
          </Link>
          <Link color="inherit" href="/law" className="text-sm">
            Хууль эрх зүй
          </Link>
          <Typography color="text.primary">ЭМДҮЗ-ийн тогтоол</Typography>
        </Breadcrumbs>
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          ЭМДҮЗ-ийн тогтоол
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
