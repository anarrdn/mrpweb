"use client";

import { useState, useEffect } from "react";
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
  Home,
  ChevronDown,
  ChevronRight,
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

  useEffect(() => {
    if (!isAdmin && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [isAdmin, isLoginPage, router]);

  if (isLoginPage) {
    return children;
  }

  const menuItems = [
    {
      title: "Хууль эрх зүй",
      icon: BookOpen,
      submenus: [
        { title: "Монгол улсын хууль", href: "/admin/law/law" },
        { title: "УИХ-ын тогтоол", href: "/admin/law/parliament" },
        { title: "Засгийн газрын тогтоол", href: "/admin/law/government" },
        {
          title: "Эрүүл мэндийн сайдын тушаал",
          href: "/admin/law/health-minister",
        },
        { title: "ЭМДҮЗ-ийн тогтоол", href: "/admin/law/emdz" },
        { title: "ЭМДЕГ-ын даргын тушаал", href: "/admin/law/emdeg" },
        { title: "Бусад эрх зүйн акт", href: "/admin/law/other" },
      ],
    },
    {
      title: "Мэдээ мэдээлэл",
      icon: Newspaper,
      submenus: [
        { title: "Хяналт шалгалтын мэдээлэл", href: "/admin/news/inspection" },
        { title: "Тайлангийн маягтууд", href: "/admin/news/report-forms" },
        { title: "Видео мэдээ", href: "/admin/news/video-news" },
        { title: "Гадаад хамтын ажиллагаа", href: "/admin/news/cooperation" },
        { title: "Судалгаа", href: "/admin/news/research" },
        { title: "Цаг үеийн мэдээлэл", href: "/admin/news/current" },
        { title: "Зар мэдээлэл", href: "/admin/news/announcements" },
        { title: "Тусгай зөвшөөрөл", href: "/admin/news/license" },
        { title: "Статистик мэдээлэл", href: "/admin/news/statistics" },
        { title: "Харьяа байгууллагын мэдээ", href: "/admin/news/affiliated" },
        { title: "Зөвлөгөө зөвлөмж", href: "/admin/news/advice" },
        {
          title: "Эрүүл мэндийн тусламжийн үйлчилгээ",
          href: "/admin/news/health-service",
        },
      ],
    },
    {
      title: "Хэрэгтэй холбоосууд",
      icon: Link2,
      submenus: [
        { title: "Эрүүл мэндийн яам", href: "/admin/links/ministry" },
        {
          title: "Эм эмнэлгийн хэрэгслийн хяналт зохицуулалтын газар",
          href: "/admin/links/control",
        },
        { title: "Эрүүл мэндийн газар", href: "/admin/links/health" },
        { title: "Үйлдвэрчний эвлэлийн холбоо", href: "/admin/links/union" },
        {
          title: "Хэрэглэгчийн эрх ашгийг хамгаалах нийгэмлэг",
          href: "/admin/links/consumer",
        },
      ],
    },
    {
      title: "Судалгаа, санал асуулга",
      icon: ClipboardList,
      submenus: [
        { title: "Хууль эрх зүй", href: "/admin/survey/create" },
        { title: "Монгол улсын стандарт", href: "/admin/survey/manage" },
        { title: "Судалгаанд оролцох", href: "/admin/survey/participate" },
        { title: "Саналаа өгөх", href: "/admin/survey/feedback" },
      ],
    },
    {
      title: "Гэрээт байгууллага",
      icon: FileText,
      submenus: [
        { title: "Эмийн сан", href: "/admin/contract/create" },
        {
          title: "Ажлын хувцасны үйлдвэр ба дэлгүүр",
          href: "/admin/contract/manage",
        },
        {
          title: "Ажлын байрны тоног төхөөрөмж, тавилга",
          href: "/admin/contract/equipment",
        },
        {
          title: "Санхүүгийн үйлчилгээ үзүүлэх байгууллагууд",
          href: "/admin/contract/finance",
        },
        { title: "Анхан шатны бүртгэл", href: "/admin/contract/register" },
      ],
    },
    {
      title: "Нүүр",
      icon: Home,
      href: "/admin/landing",
    },
    {
      title: "Үндсэн хуудас",
      icon: LayoutDashboard,
      href: "/admin/main",
    },
    {
      title: "Контент хэсгүүд",
      icon: FileText,
      href: "/admin/sections",
    },
    {
      title: "Хэрэглэгчид",
      icon: Users,
      href: "/admin/users",
    },
    {
      title: "Тохиргоо",
      icon: Settings,
      href: "/admin/settings",
    },
  ];

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transition-transform duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(false)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {menuItems.map((item) => (
            <div key={item.title}>
              {item.submenus ? (
                <div>
                  <Button
                    variant="ghost"
                    className="w-full justify-between truncate"
                    onClick={() => toggleMenu(item.title)}
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span className="truncate">{item.title}</span>
                    </div>
                    {openMenus[item.title] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                  {openMenus[item.title] && (
                    <div className="ml-4 space-y-1">
                      {item.submenus.map((submenu, idx) => (
                        <Button
                          key={submenu.title}
                          variant="ghost"
                          className={cn(
                            "w-full justify-start whitespace-normal text-left border-b last:border-b-0",
                            pathname === submenu.href && "bg-gray-100"
                          )}
                          onClick={() => handleNavigation(submenu.href)}
                        >
                          <span className="whitespace-normal">
                            {submenu.title}
                          </span>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start truncate",
                    pathname === item.href && "bg-gray-100"
                  )}
                  onClick={() => handleNavigation(item.href)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <span className="truncate">{item.title}</span>
                </Button>
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
              window.location.href = "/";
            }}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "flex-1 overflow-auto transition-all duration-300 ease-in-out",
          isSidebarOpen ? "ml-80" : "ml-0"
        )}
      >
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
