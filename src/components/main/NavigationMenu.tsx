"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Нүүр", href: "/" },
  {
    name: "Танилцуулга",
    href: "#",
    submenu: [
      { name: "Эрхэм зорилго, зорилт", href: "#goal" },
      { name: "Түүхэн замнал", href: "#history" },
      { name: "Мэндчилгээ", href: "#greeting" },
      { name: "Бүтэц", href: "#structure" },
    ],
  },
  { name: "Үйлчилгээ", href: "/services" },
  { name: "Холбоо барих", href: "/contact" },
];

export default function NavigationMenu() {
  const pathname = usePathname();

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      const id = href.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navigation.map((item) => (
        <div key={item.name} className="relative group">
          <Link
            href={item.href}
            onClick={(e) => handleScroll(e, item.href)}
            className={cn(
              "text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium",
              pathname === item.href && "text-indigo-600"
            )}
          >
            {item.name}
          </Link>
          {item.submenu && (
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-50">
              {item.submenu.map((subItem) => (
                <Link
                  key={subItem.name}
                  href={subItem.href}
                  onClick={(e) => handleScroll(e, subItem.href)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {subItem.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
