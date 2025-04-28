"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/lib/auth/auth.context";
import AuthForm from "@/components/auth/AuthForm";

const AuthModal = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isSignIn, setIsSignIn] = useState(true);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-close modal on successful authentication
  useEffect(() => {
    if (isAuthenticated && open) {
      setOpen(false);
    }
  }, [isAuthenticated, open]);

  if (!mounted) return null;

  // Remove login/logout buttons from header
  return null;

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="bg-white hover:bg-gray-100 px-6"
          onClick={logout}
        >
          Гарах
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white hover:bg-gray-100 px-6">
          Нэвтрэх
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isSignIn ? "Нэвтрэх" : "Бүртгүүлэх"}</DialogTitle>
          <DialogDescription>
            {isSignIn
              ? "Бүртгэлтэй хаягаараа нэвтэрнэ үү"
              : "Шинэ бүртгэл үүсгэх"}
          </DialogDescription>
        </DialogHeader>
        <AuthForm
          mode={isSignIn ? "login" : "register"}
          redirectTo="/dashboard"
        />
        <div className="text-center mt-4">
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline"
            onClick={() => setIsSignIn((prev) => !prev)}
          >
            {isSignIn ? "Шинэ бүртгэл үүсгэх" : "Бүртгэлтэй хэрэглэгч нэвтрэх"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
