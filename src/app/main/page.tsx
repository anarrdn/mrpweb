"use client";

import Goal from "./goal";
import History from "./history";
import Greeting from "./greeting";
import Hero from "./hero";
import Structure from "./structure";
import Image from "next/image";

export default function MainPage() {
  return (
    <main className="min-h-screen relative">
      <div className="relative z-10">
        <Hero />
        <Goal />
        <History />
        <Greeting />
        <Structure />
      </div>
    </main>
  );
}
