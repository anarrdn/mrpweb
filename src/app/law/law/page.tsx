"use client";

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

const Breadcrumbs = dynamic(() => import('@mui/material/Breadcrumbs'), { ssr: false });
const Typography = dynamic(() => import('@mui/material/Typography'), { ssr: false });

const healthLaws = [
  {
    title: "Эрүүл мэндийн тухай хууль",
    description: "Эрүүл мэндийн салбарын эрх зүйн үндсийг тогтооно.",
    href: "#"
  },
  {
    title: "Эмийн сангийн тухай хууль",
    description: "Эмийн сангийн үйл ажиллагааны зохицуулалт.",
    href: "#"
  },
  {
    title: "Эрүүл мэндийн даатгалын тухай хууль",
    description: "Эрүүл мэндийн даатгалын тогтолцоо, хэрэгжилт.",
    href: "#"
  },
  {
    title: "Эмнэлгийн тусламж үйлчилгээний тухай хууль",
    description: "Эмнэлгийн тусламж үйлчилгээний чанар, аюулгүй байдал.",
    href: "#"
  },
  {
    title: "Халдварт өвчнөөс сэргийлэх тухай хууль",
    description: "Халдварт өвчнөөс урьдчилан сэргийлэх, хяналт тавих.",
    href: "#"
  },
  {
    title: "Эм, эмнэлгийн хэрэгслийн тухай хууль",
    description: "Эм, эмнэлгийн хэрэгслийн бүртгэл, хяналт.",
    href: "#"
  }
];

export default function HealthLawListPage() {
  return (
    <section className="w-full flex justify-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl px-6 py-12 mt-20 mb-16">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              Нүүр
            </Link>
            <Link color="inherit" href="/law">
              Хууль эрх зүй
            </Link>
            <Typography color="text.primary">Эрүүл мэндийн хууль</Typography>
          </Breadcrumbs>
        </div>
        <h1 className="text-4xl font-extrabold mb-4 text-center text-gray-900">Эрүүл мэндийн салбарын хууль, эрх зүй</h1>
        <p className="text-lg text-gray-600 mb-10 text-center">
          Эрүүл мэндийн салбарт хамаарах гол хууль, эрх зүйн баримт бичгүүдийн жагсаалт:
        </p>
        <div className="space-y-6">
          {healthLaws.map((law, idx) => (
            <Card
              key={idx}
              className="p-6 flex items-center gap-4 rounded-xl bg-gray-50 border border-gray-200 hover:shadow-2xl transition-shadow group"
            >
              {/* Example icon */}
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-blue-800 group-hover:underline mb-1">{law.title}</h2>
                <p className="text-gray-700 text-sm">{law.description}</p>
              </div>
              <Link
                href={law.href}
                className="ml-4 px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-sm font-semibold"
              >
                Дэлгэрэнгүй
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 