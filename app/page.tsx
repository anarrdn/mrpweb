"use client";

import Header from "@/components/main/Header";
import Hero from "./_landing/hero";
import Goal from "./_landing/goal";
import History from "./_landing/history";
import Greeting from "./_landing/greeting";
import Structure from "./_landing/structure";
import { useContent } from "@/lib/content/content.context";

export default function Home() {
  const { content } = useContent();

  return (
    <main>
      <Header />
      <Hero />
      <Goal />
      <History />
      <Greeting />
      <Structure />
    </main>
  );
}
