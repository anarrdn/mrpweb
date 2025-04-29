"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface Department {
  name: string;
  description: string;
}

interface StructureProps {
  content: {
    title?: string;
    description?: string;
    departments?: Department[];
  };
}

export default function Structure({ content }: StructureProps) {
  const departments = content?.departments || [
    {
      name: "Удирдах зөвлөл",
      description: "Байгууллагын бодлого, стратегийг боловсруулж, хэрэгжүүлэх"
    },
    {
      name: "Гишүүнчлэлийн хэлтэс",
      description: "Гишүүнчлэлийн асуудлыг шийдвэрлэх"
    },
    {
      name: "Хууль зүйн хэлтэс",
      description: "Хууль зүйн асуудлыг шийдвэрлэх"
    }
  ];

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
            {content?.title || "Байгууллагын бүтэц"}
          </h2>
          <p className="text-lg text-gray-600">
            {content?.description}
          </p>
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
              alt="Structure illustration"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6"
          >
            {departments.map((department, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <Card className="h-full p-6 bg-white border-gray-200 hover:border-blue-200 transition-colors duration-300">
                  <div className="flex flex-col h-full">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {department.name}
                      </h3>
                      <p className="text-gray-600">
                        {department.description}
                      </p>
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
