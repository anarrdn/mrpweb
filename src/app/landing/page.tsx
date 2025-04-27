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

export default function LandingPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [landing, setLanding] = useState<{ backgroundImage?: string | null }>({ backgroundImage: null });
  const [contentError, setContentError] = useState<string | null>(null);
  const { user, isAuthenticated, logout, register } = useAuth();
  const isAdmin = user?.role === 'admin';

  // Close AuthModal when authenticated
  useEffect(() => {
    if (isAuthenticated && isAuthModalOpen) {
      setIsAuthModalOpen(false);
    }
  }, [isAuthenticated, isAuthModalOpen]);

  const fetchContent = useCallback(async () => {
    try {
      setContentError(null);
      const response = await apiClient.getContent();
      if ('landing' in response && response.landing) {
        setLanding((response as any).landing);
      }
    } catch (error) {
      setContentError("Failed to fetch content");
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
      setContentError(null);
      // Convert File to base64 if it's a file upload
      if (updatedData.backgroundImage instanceof File) {
        const base64Image = await fileToBase64(updatedData.backgroundImage);
        updatedData.backgroundImage = base64Image;
      }
      
      const response = await apiClient.updateContent("landing", updatedData);
      if ('landing' in response && response.landing) {
        setLanding((response as any).landing);
      }
      setIsEditModalOpen(false);
    } catch (error) {
      setContentError("Failed to save content");
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
  const handleRegister = async (formData: FormData) => {
    const data: any = {};
    for (const [key, value] of formData.entries()) {
      if (key === 'payment_proof' && value instanceof File && value.size > 0) {
        data[key] = await fileToBase64(value);
      } else if (key !== 'username') {
        data[key] = value;
      }
    }
    await register(data);
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Navigation */}
      <div className="fixed top-0 right-0 p-4 z-50 flex gap-4">
        {isAdmin && (
          <Button
            onClick={() => setIsEditModalOpen(true)}
            variant="outline"
            className="bg-white/20 backdrop-blur-sm"
          >
            Edit Page
          </Button>
        )}
        {isAuthenticated ? (
          <Button
            onClick={logout}
            variant="ghost"
            className="text-gray-800 hover:text-gray-600 hover:bg-transparent underline"
          >
            Гарах
          </Button>
        ) : (
          <>
            <Button
              onClick={() => setIsAuthModalOpen(true)}
              variant="ghost"
              className="text-gray-800 hover:text-gray-600 hover:bg-transparent underline"
            >
              Мэдэгдэл
            </Button>
            <Button
              onClick={() => setIsAuthModalOpen(true)}
              variant="ghost"
              className="text-gray-800 hover:text-gray-600 hover:bg-transparent underline"
            >
              Нэвтрэх
            </Button>
            <Button
              onClick={() => setIsAuthModalOpen(true)}
              variant="ghost"
              className="text-gray-800 hover:text-gray-600 hover:bg-transparent underline"
            >
              Бүртгүүлэх
            </Button>
          </>
        )}
      </div>

      {/* Background Image - Only show if admin has uploaded one */}
      {imageUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={imageUrl}
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      {/* Main Content */}
      <div className={`min-h-screen flex flex-col items-center justify-center px-4 relative z-10 ${imageUrl ? 'text-white' : 'text-gray-800'}`}>
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <Image src="/branding/logo.png" alt="Logo" fill className="object-contain" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            МОНГОЛЫН ЭМ ХАНГАМЖИЙН ШИНЭЧЛЭЛ ХОЛБОО
          </h1>
          <p className="text-lg max-w-3xl mx-auto">
            НИЙТИЙН ҮЙЛЧИЛГЭЭТЭЙ ЭМИЙН САНГУУДЫН НЭГДСЭН ГИШҮҮДДЭЭ ҮЙЛЧИЛДЭГ
            ТӨРИЙН БУС БАЙГУУЛЛАГА
          </p>
          {contentError && (
            <p className="text-red-500 bg-white/10 px-4 py-2 rounded absolute bottom-4 left-1/2 transform -translate-x-1/2">
              {contentError}
            </p>
          )}
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mx-auto w-full max-w-6xl">
          <Link
            href="/main"
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center hover:bg-white/20 transition-all transform hover:-translate-y-1 border border-white/20"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-white/30 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">ЦАХИМ ХУУДАС</h3>
          </Link>

          <Link
            href="/schedule"
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center hover:bg-white/20 transition-all transform hover:-translate-y-1 border border-white/20"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-white/30 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">ХУГАЦААТ ТӨЛӨВЛӨГӨӨ</h3>
          </Link>

          <Link
            href="/documents"
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center hover:bg-white/20 transition-all transform hover:-translate-y-1 border border-white/20"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-white/30 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">ЗАР МЭДЭЭ</h3>
          </Link>

          <Link
            href="/services"
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center hover:bg-white/20 transition-all transform hover:-translate-y-1 border border-white/20"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-white/30 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">ШИЛЭН ДАНС</h3>
          </Link>

          <Button
            onClick={isAuthenticated ? logout : () => setIsAuthModalOpen(true)}
            variant="outline"
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center hover:bg-white/20 transition-all transform hover:-translate-y-1 border border-white/20 h-full flex flex-col items-center justify-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-white/30 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {isAuthenticated ? 'Гарах' : 'Нэвтрэх Бүртгүүлэх'}
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

      {/* Dynamic Editing Modal - Always present for admin users */}
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
