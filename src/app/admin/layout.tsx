"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

  if (!isAdmin) {
    router.push("/login");
    return null;
  }

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
    },
    {
      title: "News",
      icon: Newspaper,
      href: "/admin/news",
    },
    {
      title: "Links",
      icon: Link2,
      href: "/admin/links",
    },
    {
      title: "Laws",
      icon: BookOpen,
      href: "/admin/laws",
    },
    {
      title: "Menus",
      icon: Menu,
      href: "/admin/menus",
    },
    {
      title: "Documents",
      icon: FileText,
      href: "/admin/documents",
    },
    {
      title: "Media",
      icon: Image,
      href: "/admin/media",
    },
    {
      title: "Users",
      icon: Users,
      href: "/admin/users",
    },
    {
      title: "Surveys",
      icon: ClipboardList,
      href: "/admin/surveys",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/admin/settings",
    },
  ];

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
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => router.push(item.href)}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.title}
              </Button>
            ))}
          </nav>
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500"
              onClick={logout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="w-4 h-4" />
          </Button>
          {children}
        </div>
      </div>
    </div>
  );
}
