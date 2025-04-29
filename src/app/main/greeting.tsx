"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface GreetingProps {
  content: {
    title?: string;
    description?: string;
    author?: string;
    position?: string;
  };
}

export default function Greeting({ content }: GreetingProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {content?.title || "Мэндчилгээ"}
          </h2>
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
              src="/branding/consultation.jpg"
              alt="Greeting illustration"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {content?.description}
                  </p>
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {content?.author || "Ерөнхийлөгч"}
                    </h3>
                    <p className="text-gray-600">
                      {content?.position || "Монголын Эм Хангамжийн Шинэчлэл Холбоо"}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
