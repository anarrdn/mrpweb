"use client";

import Link from "next/link";
import { MENU } from "@/lib/config";
import { DROPDOWN_ITEMS } from "./dropdownContents";
import Dropdown from "./Dropdown";
import { useAuth } from "@/lib/auth/auth.context";
import { memo } from "react";

const NavigationMenu = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/"
        className="px-4 py-2 hover:bg-gray-100 rounded-md transition duration-200"
      >
        Нүүр
      </Link>
      <div className="flex items-center gap-4">
        {MENU.map((item) => (
          <div key={item.href} className="relative">
            {DROPDOWN_ITEMS[item.label as keyof typeof DROPDOWN_ITEMS] ? (
              <Dropdown
                label={item.label}
                items={
                  DROPDOWN_ITEMS[item.label as keyof typeof DROPDOWN_ITEMS]
                }
              />
            ) : (
              <Link
                href={`/#${item.href}`}
                className="px-4 py-2 hover:bg-gray-100 rounded-md transition duration-200"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
        {isAuthenticated && user?.role === "admin" && (
          <Link
            href="/admin/dashboard"
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition duration-200 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Админ Хяналт
          </Link>
        )}
      </div>
    </div>
  );
};

export default memo(NavigationMenu);
