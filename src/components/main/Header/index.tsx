"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState, Suspense } from "react";
import { TitleSection } from "./TitleSection";
import NavigationMenu from "./NavigationMenu";
import dynamic from "next/dynamic";

const AuthModal = dynamic(() => import("./AuthModal"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center gap-4">
      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
        Loading...
      </button>
    </div>
  ),
});

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [parent] = useAutoAnimate();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md"
      ref={parent}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <TitleSection />
        </div>
        <div className="flex items-center gap-4 mt-6 relative">
          <NavigationMenu />
          <div className="ml-auto">
            <Suspense fallback={<div>Loading...</div>}>
              <AuthModal />
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
