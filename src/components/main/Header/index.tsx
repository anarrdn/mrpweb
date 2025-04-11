"use client";

import { Button } from "@/components/ui/button";
import { MENU } from "@/lib/config";
import { cn } from "@/lib/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Logo from "../Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [parent] = useAutoAnimate();
  return (
    <header
      className="fixed top-8 border-white border-[3px] w-fit mx-auto rounded-3xl right-0 left-0 z-10 px-8 py-2 bg-white/50 backdrop-blur-md"
      ref={parent}
    >
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center gap-16">
          <div>
            <Logo dark />
          </div>
          <div className="md:flex items-center gap-8 hidden">
            {MENU.map((item) => (
              <Link
                href={`/#${item.href}`}
                key={item.href}
                className="p-4 hover:font-semibold transition duration-200"
              >
                <p>{item.label}</p>
              </Link>
            ))}
          </div>
        </div>
        {/* desktop*/}
        <div className="md:block hidden ml-16">
          <Button
            variant="outline"
            className="bg-white hover:bg-gray-100 px-6"
            onClick={() => {
              // TODO: Add login functionality
              console.log("Login clicked");
            }}
          >
            Нэвтрэх
          </Button>
        </div>

        {/* mobile */}
        <div className="block md:hidden">
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "p-4 rounded-full ",
              isMenuOpen
                ? "bg-gray-200 border border-primary hover:bg-gray-200"
                : "bg-primary "
            )}
          >
            <Image
              src={isMenuOpen ? "/svg/close.svg" : "/svg/menu.svg"}
              alt="menu"
              width={15}
              height={15}
            />
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div>
          <div className="flex flex-col items-center gap-8 mt-4">
            {MENU.map((item) => (
              <Link
                href={`/#${item.href}`}
                key={item.href}
                className="px-4 hover:font-semibold transition duration-200 text-lg font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                <p>{item.label}</p>
              </Link>
            ))}
            <div className="flex items-center gap-4">
              <Link href="https://apps.apple.com/us/app/zahii/id6449288619">
                <Image
                  src="/images/app_store-min.webp"
                  width={150}
                  height={80}
                  alt="appstore"
                />
              </Link>
              <Link href="https://play.google.com/store/apps/details?id=zahi.techpartners.asia&pli=1">
                <Image
                  src="/images/play_store-min.webp"
                  width={160}
                  height={90}
                  alt="playstore"
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
