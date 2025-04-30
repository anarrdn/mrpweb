"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import { TitleSection } from "./TitleSection";
import NewNavigation from "./NewNavigation";
import Link from "next/link";

const Header = () => {
  const [parent] = useAutoAnimate();

  return (
    <header
      className="w-full shadow-md bg-[#00b1ad] text-white fixed top-0 left-0 right-0 z-50 h-[140px]"
      ref={parent}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <TitleSection />
          <div className="ml-auto"></div>
        </div>
        <div className="flex items-center justify-center mt-6">
          <NewNavigation />
        </div>
      </div>
    </header>
  );
};

export default Header;
