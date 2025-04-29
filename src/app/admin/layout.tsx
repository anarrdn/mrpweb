"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/auth.context";
import {
  LayoutDashboard,
  Newspaper,
  Link2,
  Users,
  Settings,
  LogOut,
  Menu,
  FileText,
  Image,
  BookOpen,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isAdmin, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  if (!isAdmin && !isLoginPage) {
    router.push("/admin/login");
    return null;
  }

  if (isLoginPage) {
    return children;
  }

  const menuItems = [
    {
      title: "News",
      icon: Newspaper,
      submenus: [
        {
          title: "All News",
          href: "/admin/news",
        },
        {
          title: "Add News",
          href: "/admin/news/add",
        },
        {
          title: "Categories",
          href: "/admin/news/categories",
        },
      ],
    },
    {
      title: "Links",
      icon: Link2,
      submenus: [
        {
          title: "All Links",
          href: "/admin/links",
        },
        {
          title: "Add Link",
          href: "/admin/links/add",
        },
        {
          title: "Categories",
          href: "/admin/links/categories",
        },
      ],
    },
    {
      title: "Laws",
      icon: BookOpen,
      submenus: [
        {
          title: "All Laws",
          href: "/admin/laws",
        },
        {
          title: "Add Law",
          href: "/admin/laws/add",
        },
        {
          title: "Categories",
          href: "/admin/laws/categories",
        },
      ],
    },
    {
      title: "Documents",
      icon: FileText,
      submenus: [
        {
          title: "All Documents",
          href: "/admin/documents",
        },
        {
          title: "Add Document",
          href: "/admin/documents/add",
        },
        {
          title: "Categories",
          href: "/admin/documents/categories",
        },
      ],
    },
    {
      title: "Media",
      icon: Image,
      submenus: [
        {
          title: "All Media",
          href: "/admin/media",
        },
        {
          title: "Add Media",
          href: "/admin/media/add",
        },
        {
          title: "Categories",
          href: "/admin/media/categories",
        },
      ],
    },
    {
      title: "Users",
      icon: Users,
      submenus: [
        {
          title: "All Users",
          href: "/admin/users",
        },
        {
          title: "Add User",
          href: "/admin/users/add",
        },
        {
          title: "Roles",
          href: "/admin/users/roles",
        },
      ],
    },
    {
      title: "Settings",
      icon: Settings,
      submenus: [
        {
          title: "General",
          href: "/admin/settings",
        },
        {
          title: "Menus",
          href: "/admin/settings/menus",
        },
        {
          title: "Surveys",
          href: "/admin/settings/surveys",
        },
      ],
    },
  ];

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={cn(
          "bg-white shadow-lg transition-all duration-300",
          isSidebarOpen ? "w-64" : "w-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => (
              <div key={item.title} className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => toggleMenu(item.title)}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.title}
                </Button>
                {openMenus[item.title] && (
                  <div className="pl-8 space-y-1">
                    {item.submenus?.map((submenu) => (
                      <Button
                        key={submenu.href}
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => router.push(submenu.href)}
                      >
                        {submenu.title}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500"
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
