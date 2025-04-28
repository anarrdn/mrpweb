"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthModal from "@/components/auth/AuthModal";
import { useAuth } from "@/lib/auth/auth.context";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api/client";
import { Button } from "@/components/ui/button";
import { DynamicEditModal } from "@/components/ui/dynamic-edit-modal";
import { Bell, LogIn, UserPlus } from "lucide-react";
import { EditButton } from "@/components/ui/edit-button";
import { Notification, Content } from "@/lib/api/types";

interface LandingContent {
  backgroundImage?: string | null;
}

export default function LandingPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [landing, setLanding] = useState<LandingContent>({
    backgroundImage: null,
  });
  const { user, isAuthenticated, logout, register } = useAuth();
  const isAdmin = user?.role === "admin";
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);

  // Close AuthModal when authenticated
  useEffect(() => {
    if (isAuthenticated && isAuthModalOpen) {
      setIsAuthModalOpen(false);
    }
  }, [isAuthenticated, isAuthModalOpen]);

  const fetchContent = useCallback(async () => {
    try {
      const response = await apiClient.getContent();
      const content = response as unknown as Content;
      if (content && "landing" in content && content.landing) {
        setLanding(content.landing as LandingContent);
      }
    } catch (error) {
      // Silently handle the error without setting any state
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const getValidImageUrl = (url: string | null | undefined) => {
    if (!url) return null;
    if (url.startsWith("data:image")) return url;
    if (!url.startsWith("/") && !url.startsWith("http")) return `/${url}`;
    return url;
  };

  const handleSave = async (updatedData: Record<string, any>) => {
    try {
      // Convert File to base64 if it's a file upload
      if (updatedData.backgroundImage instanceof File) {
        const base64Image = await fileToBase64(updatedData.backgroundImage);
        updatedData.backgroundImage = base64Image;
      }

      const response = await apiClient.updateContent("landing", updatedData);
      const content = response as unknown as Content;
      if (content && "landing" in content && content.landing) {
        setLanding(content.landing as LandingContent);
      } else {
        setLanding({ backgroundImage: null });
      }
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to save content:", error);
    }
  };

  const imageUrl = getValidImageUrl(landing.backgroundImage);

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
    const transformedData = {
      email: data.email,
      password: data.password,
      name: data.name,
      username: data.username,
      pharmacyName: data.pharmacy_name,
      pharmacyRegisterNumber: data.pharmacy_register_number,
      pharmacyAddress: data.pharmacy_address,
      phoneNumber: data.phone_number.toString(),
      payment_proof: data.payment_proof,
    };
    await register(transformedData);
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
      {/* Edit Button */}
      <EditButton onClick={() => setIsEditModalOpen(true)} />

      {/* Navigation */}
      <div className="fixed top-0 right-0 p-4 z-50 flex gap-4">
        <Button
          onClick={() => setIsNotificationOpen(true)}
          variant="ghost"
          className="text-white hover:text-gray-200 hover:bg-transparent underline"
        >
          Мэдэгдэл
        </Button>
        {isAuthenticated ? (
          <Button
            onClick={logout}
            variant="ghost"
            className="text-white hover:text-gray-200 hover:bg-transparent underline"
          >
            Гарах
          </Button>
        ) : (
          <>
            <Button
              onClick={() => setIsAuthModalOpen(true)}
              variant="ghost"
              className="text-white hover:text-gray-200 hover:bg-transparent underline"
            >
              Нэвтрэх
            </Button>
            <Button
              onClick={() => setIsAuthModalOpen(true)}
              variant="ghost"
              className="text-white hover:text-gray-200 hover:bg-transparent underline"
            >
              Бүртгүүлэх
            </Button>
          </>
        )}
      </div>

      {/* Notification Modal */}
      {isNotificationOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsNotificationOpen(false)}
            >
              ×
            </button>
            <h2 className="text-lg font-bold mb-4">Мэдэгдэл</h2>
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
          </div>
        </div>
      )}

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
        className={`min-h-screen flex flex-col items-center justify-start pt-20 px-4 relative z-10 text-white`}
      >
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto mb-4 relative">
            <Image
              src="/branding/mrp.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold mb-2">
            МОНГОЛЫН ЭМ ХАНГАМЖИЙН ШИНЭЧЛЭЛ ХОЛБОО
          </h1>
          <p className="text-lg max-w-3xl mx-auto">
            НИЙТИЙН ҮЙЛЧИЛГЭЭТЭЙ ЭМИЙН САНГУУДЫН НЭГДСЭН ГИШҮҮДДЭЭ ҮЙЛЧИЛДЭГ
            ТӨРИЙН БУС БАЙГУУЛЛАГА
          </p>
        </div>
        {/* Service Cards */}
        <div className="grid grid-cols-5 gap-6 mx-auto w-full max-w-6xl mt-8">
          <Link
            href="/main"
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center hover:bg-white/20 transition-all transform hover:-translate-y-1 border border-white/20"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-white/30 rounded-full flex items-center justify-center">
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
            <h3 className="text-lg font-semibold">Цахим хуудас</h3>
          </Link>

          <Link
            href="/schedule"
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center hover:bg-white/20 transition-all transform hover:-translate-y-1 border border-white/20"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-white/30 rounded-full flex items-center justify-center">
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
            <h3 className="text-lg font-semibold">ХУГАЦААТ ТӨЛӨВЛӨГӨӨ</h3>
          </Link>

          <Link
            href="/documents"
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center hover:bg-white/20 transition-all transform hover:-translate-y-1 border border-white/20"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-white/30 rounded-full flex items-center justify-center">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">ЗАР МЭДЭЭ</h3>
          </Link>

          <Link
            href="/services"
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center hover:bg-white/20 transition-all transform hover:-translate-y-1 border border-white/20"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-white/30 rounded-full flex items-center justify-center">
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
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">ШИЛЭН ДАНС</h3>
          </Link>

          <Button
            onClick={isAuthenticated ? logout : () => setIsAuthModalOpen(true)}
            variant="outline"
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center hover:bg-white/20 transition-all transform hover:-translate-y-1 border border-white/20 h-full flex flex-col items-center justify-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-white/30 rounded-full flex items-center justify-center">
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
            <h3 className="text-lg font-semibold">
              {isAuthenticated ? "Гарах" : "Нэвтрэх Бүртгүүлэх"}
            </h3>
          </Button>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onRegister={handleRegister}
      />

      {/* Dynamic Editing Modal */}
      {isAdmin && (
        <DynamicEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Landing Page"
          initialData={landing}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
