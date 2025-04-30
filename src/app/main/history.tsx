"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface HistoryItem {
  year: string;
  title: string;
  description: string;
  icon?: string;
}

interface HistoryProps {
  content: {
    title?: string;
    description?: string;
    image?: string;
    items?: HistoryItem[];
  };
}

export default function History({ content }: HistoryProps) {
  const defaultItems: HistoryItem[] = [
    {
      year: "2023",
      title: "Байгуулагдсан",
      description: "Монголын Эм Хангамжийн Шинэчлэл Холбоо байгуулагдсан",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    },
    {
      year: "2024",
      title: "Цахимжуулалт",
      description: "Эмийн сангуудын цахимжуулалтын төсөл эхэлсэн",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      year: "Ирээдүй",
      title: "Шинэчлэл",
      description: "Эмийн хангамжийн системийг бүрэн шинэчлэх",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
    },
  ];

  const items = content?.items || defaultItems;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {content?.title || "Түүхэн замнал"}
          </h2>
          <p className="text-lg text-gray-600">{content?.description}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-xl overflow-hidden shadow-xl"
          >
            <Image
              src={content?.image || "/branding/consultation.jpg"}
              alt="History illustration"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 bg-white border-gray-200">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-yellow-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={item.icon}
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {item.year}
                        </h3>
                        <span className="text-gray-500">-</span>
                        <h4 className="text-lg font-medium text-gray-700">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-gray-600 mt-2">{item.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
