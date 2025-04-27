"use client";

import Goal from "./goal";
import History from "./history";
import Greeting from "./greeting";
import Hero from "./hero";
import ContentEditor from "@/components/content/ContentEditor";
import Structure from "./structure";

export default function MainPage() {
  const defaultHeroContent = {
    title: "Welcome to Our Platform",
    subtitle: "Your Gateway to Knowledge",
    backgroundImage: "/images/hero-bg.jpg"
  };

  return (
    <main className="min-h-screen">
      <Hero />
      <ContentEditor section="hero" defaultContent={defaultHeroContent} />
      <Goal />
      <History />
      <Greeting />
      <Structure />
    </main>
  );
}
