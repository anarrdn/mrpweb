"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface GoalItem {
  title: string;
  description: string;
  icon?: string;
}

interface GoalProps {
  content: {
    title?: string;
    description?: string;
    image?: string;
    goals?: GoalItem[];
  };
}

export default function Goal({ content }: GoalProps) {
  const defaultGoals: GoalItem[] = [
    {
      title: "Цахимжуулалт",
      description: "Эмийн сангуудын үйл ажиллагааг бүрэн цахимжуулах",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    {
      title: "Шинэчлэл",
      description: "Эмийн хангамжийн системийг бүрэн шинэчлэх",
      icon: "M13 10V3L4 14h7v7l9-11h-7z"
    },
    {
      title: "Үйлчилгээ",
      description: "Эмийн сангуудын үйлчилгээг сайжруулах",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    }
  ];

  const goals = content?.goals || defaultGoals;

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
            {content?.title || "Эрхэм зорилго, зорилт"}
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
            className="space-y-6"
          >
            {goals.map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 bg-blue-50 border-blue-100">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={goal.icon} />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{goal.title}</h3>
                      <p className="text-gray-600">{goal.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-xl overflow-hidden shadow-xl"
          >
            <Image
              src={content?.image || "/branding/consultation.jpg"}
              alt="Goal illustration"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
