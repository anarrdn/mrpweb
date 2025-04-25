"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthModal from "@/components/auth/AuthModal";
import { useAuth } from "@/lib/auth/auth.context";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, register } = useAuth();
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError("");

    try {
      // Use the server-side API route for authentication
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Close the modal and redirect on success
      setIsAuthModalOpen(false);
      router.push("/main"); // Redirect to the main dashboard
      router.refresh(); // Refresh the page to get the new auth state
    } catch (error) {
      console.error("Login failed:", error);
      setError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (formData: FormData) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }
      setIsAuthModalOpen(false);
      router.push("/main");
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 flex flex-col items-center justify-center">
      {/* Navigation */}
      <nav className="absolute top-0 right-0 p-4 text-white">
        <div className="flex gap-4">
          <Link href="/info" className="hover:text-blue-200">
            Мэдээлэл
          </Link>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="hover:text-blue-200"
          >
            Нэвтрэх
          </button>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="hover:text-blue-200"
          >
            Бүртгүүлэх
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10 flex flex-col items-center justify-center max-w-6xl">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            МОНГОЛЫН ЭМ ХАНГАМЖИЙН ШИНЭЧЛЭЛ ХОЛБОО
          </h1>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto">
            НИЙТИЙН ҮЙЛЧИЛГЭЭТЭЙ ЭМИЙН САНГУУДЫН НЭГДСЭН ГИШҮҮДДЭЭ ҮЙЛЧИЛДЭГ
            ТӨРИЙН БУС БАЙГУУЛЛАГА
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mx-auto w-full">
          <Link
            href="/main"
            className="bg-white bg-opacity-10 rounded-lg p-6 text-center text-white hover:bg-opacity-20 transition-all transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-700 rounded-full flex items-center justify-center">
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
            className="bg-white bg-opacity-10 rounded-lg p-6 text-center text-white hover:bg-opacity-20 transition-all transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-700 rounded-full flex items-center justify-center">
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
            className="bg-white bg-opacity-10 rounded-lg p-6 text-center text-white hover:bg-opacity-20 transition-all transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-700 rounded-full flex items-center justify-center">
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
            className="bg-white bg-opacity-10 rounded-lg p-6 text-center text-white hover:bg-opacity-20 transition-all transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-700 rounded-full flex items-center justify-center">
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

          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="bg-white bg-opacity-10 rounded-lg p-6 text-center text-white hover:bg-opacity-20 transition-all transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-700 rounded-full flex items-center justify-center">
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
            <h3 className="text-lg font-semibold mb-2">НЭВТРЭХ БҮРТГҮҮЛЭХ</h3>
          </button>
        </div>
      </div>

      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/landing-bg.jpg"
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
