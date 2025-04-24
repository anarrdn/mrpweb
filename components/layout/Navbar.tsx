"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth.context";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/auth/AuthModal";
import { toast } from "sonner";

export function Navbar() {
  const { isAuthenticated, user, login, register, logout, updateUserRole } =
    useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      setIsAuthModalOpen(false);
      toast.success("Амжилттай нэвтэрлээ");
    } catch (error) {
      toast.error("Нэвтрэх нэр эсвэл нууц үг буруу байна");
    }
  };

  const handleRegister = async (
    email: string,
    password: string,
    name: string,
    pharmacyId: string,
    pharmacyAddress: string
  ) => {
    try {
      await register(email, password, name, pharmacyId, pharmacyAddress);
      setIsAuthModalOpen(false);
      toast.success("Бүртгэл амжилттай боллоо");
    } catch (error) {
      toast.error("Бүртгэл үүсгэхэд алдаа гарлаа");
    }
  };

  const handleUpdateRole = async () => {
    try {
      await updateUserRole("admin");
      toast.success("Хэрэглэгчийн эрх амжилттай шинэчлэгдлээ");
    } catch (error) {
      toast.error("Хэрэглэгчийн эрх шинэчлэхэд алдаа гарлаа");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Medtech MRP
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {user?.role === "admin" && (
                  <Link href="/admin/dashboard">
                    <Button
                      variant="outline"
                      className="bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Админ хяналт
                    </Button>
                  </Link>
                )}
                {user?.role === "user" && (
                  <Button
                    variant="outline"
                    className="bg-green-500 text-white hover:bg-green-600"
                    onClick={handleUpdateRole}
                  >
                    Админ болгох
                  </Button>
                )}
                <Button variant="outline" onClick={logout}>
                  Гарах
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsAuthModalOpen(true)}>Нэвтрэх</Button>
            )}
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </nav>
  );
}
