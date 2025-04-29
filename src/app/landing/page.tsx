"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useAuth } from "@/lib/auth/auth.context";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Notification } from "@/lib/api/types";

interface LandingSettings {
  backgroundImage?: string | null;
  title?: string;
  subtitle?: string;
}

export default function LandingPage() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [landingSettings, setLandingSettings] = useState<LandingSettings>({
    backgroundImage: null,
    title: "МОНГОЛЫН ЭМ ХАНГАМЖИЙН ШИНЭЧЛЭЛ ХОЛБОО",
    subtitle: "НИЙТИЙН ҮЙЛЧИЛЛГЭЭТЭЙ ЭМИЙН САНГУУДЫН НЭГДСЭН ГИШҮҮДДЭЭ ҮЙЛЧИЛДЭГ ТӨРИЙН БУС БАЙГУУЛЛАГА",
  });
  const { user, isAuthenticated, logout, register } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);
  const router = useRouter();

  const fetchSettings = useCallback(async () => {
    try {
      const settings = await apiClient.getSettings();
      if (settings && Array.isArray(settings)) {
        const landingSetting = settings.find((s) => s.key === "landing");
        if (landingSetting) {
          try {
            const parsedValue = JSON.parse(landingSetting.value);
            setLandingSettings(parsedValue);
          } catch (error) {
            console.error("Failed to parse landing settings:", error);
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch landing settings:", error);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const getValidImageUrl = (url: string | null | undefined) => {
    if (!url) return null;
    if (url.startsWith("data:image")) return url;
    if (!url.startsWith("/") && !url.startsWith("http")) return `/${url}`;
    return url;
  };

  // Helper to convert File to base64
  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Wrapper for registration to convert FormData to object
  const handleRegister = async (data: {
    email: string;
    password: string;
    name: string;
    username: string;
    pharmacy_name: string;
    pharmacy_register_number: string;
    pharmacy_address: string;
    phone_number: number;
    payment_proof: string;
  }) => {
    await register(data);
  };

  const fetchNotifications = useCallback(async () => {
    setIsLoadingNotifications(true);
    try {
      const data = await apiClient.getNotifications();
      setNotifications(data);
    } catch (error) {
      setNotifications([]);
    } finally {
      setIsLoadingNotifications(false);
    }
  }, []);

  useEffect(() => {
    if (isNotificationOpen) {
      fetchNotifications();
    }
  }, [isNotificationOpen, fetchNotifications]);

  return (
    <div className="min-h-screen bg-white relative">
      {/* Navigation */}
      <div className="fixed top-0 right-0 p-4 z-50 flex gap-4">
        <Button
          onClick={() => setIsNotificationOpen(true)}
          variant="ghost"
          className="text-white !text-white hover:!text-white/80 hover:bg-transparent underline"
        >
          Мэдэгдэл
        </Button>
        {isAuthenticated ? (
          <Button
            onClick={logout}
            variant="ghost"
            className="text-white !text-white hover:!text-white/80 hover:bg-transparent underline"
          >
            Гарах
          </Button>
        ) : (
          <>
            <Button
              onClick={() => router.push('/login')}
              variant="ghost"
              className="text-white !text-white hover:!text-white/80 hover:bg-transparent underline"
            >
              Нэвтрэх
            </Button>
            <Button
              onClick={() => router.push('/register')}
              variant="ghost"
              className="text-white !text-white hover:!text-white/80 hover:bg-transparent underline"
            >
              Бүртгүүлэх
            </Button>
          </>
        )}
      </div>

      {/* Notification Dialog */}
      <Dialog open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Мэдэгдэл</DialogTitle>
          </DialogHeader>
          {isLoadingNotifications ? (
            <div>Уншиж байна...</div>
          ) : notifications.length === 0 ? (
            <div>Мэдэгдэл алга</div>
          ) : (
            <ul className="space-y-2 max-h-80 overflow-y-auto">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className={`bg-gray-100 rounded p-2 ${
                    !n.read ? "font-bold" : ""
                  }`}
                >
                  <div className="text-sm text-gray-800">{n.title}</div>
                  <div className="text-xs text-gray-600 mb-1">
                    {new Date(n.createdAt).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-700">{n.message}</div>
                </li>
              ))}
            </ul>
          )}
        </DialogContent>
      </Dialog>

      {/* Background Image - Always show the medicine image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/branding/consultation.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Main Content */}
      <div
        className={`min-h-screen flex flex-col items-center px-4 relative z-10 text-white`}
      >
        {/* Logo and Title */}
        <div className="text-center mb-6">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <Image
              src="/branding/mrp.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold mb-3">{landingSettings.title}</h1>
          <p className="text-lg whitespace-nowrap max-w-[1200px] mx-auto">
            {landingSettings.subtitle}
          </p>
        </div>
        {/* Service Cards */}
        <div className="grid grid-cols-5 gap-6 mx-auto w-full max-w-6xl mt-4">
          <Card
            onClick={() => router.push('/main')}
            className="group cursor-pointer w-full h-full bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 border border-white/10 hover:border-white/20 text-white hover:text-white shadow-lg hover:shadow-xl"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Цахим хуудас</h3>
          </Card>

          <Card
            onClick={() => router.push('/schedule')}
            className="group cursor-pointer w-full h-full bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 border border-white/10 hover:border-white/20 text-white hover:text-white shadow-lg hover:shadow-xl"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">ХУГАЦААТ ТӨЛӨВЛӨГӨӨ</h3>
          </Card>

          <Card
            onClick={() => router.push('/news')}
            className="group cursor-pointer w-full h-full bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 border border-white/10 hover:border-white/20 text-white hover:text-white shadow-lg hover:shadow-xl"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">ЗАР МЭДЭЭ</h3>
          </Card>

          <Card
            onClick={() => router.push('/contact')}
            className="group cursor-pointer w-full h-full bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 border border-white/10 hover:border-white/20 text-white hover:text-white shadow-lg hover:shadow-xl"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">ШИЛЭН ДАНС</h3>
          </Card>

          <Card
            onClick={isAuthenticated ? logout : () => router.push('/login')}
            className="group cursor-pointer w-full h-full bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 border border-white/10 hover:border-white/20 text-white hover:text-white shadow-lg hover:shadow-xl"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">
              {isAuthenticated ? "Гарах" : "Нэвтрэх Бүртгүүлэх"}
            </h3>
          </Card>
        </div>
      </div>
    </div>
  );
}
