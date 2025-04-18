"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth/auth.context";
import { useRouter } from "next/navigation";

const AuthModal = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isAuthenticated, login, logout } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      // Close the dialog after successful login
      const dialog = document.querySelector('[role="dialog"]');
      if (dialog) {
        (dialog as HTMLElement).style.display = "none";
      }
    } catch (error) {
      setError("Нэвтрэх нэр эсвэл нууц үг буруу байна");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!mounted) {
    return null;
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {isAuthenticated ? "Админ" : ""}
        </span>
        <Button
          variant="outline"
          className="bg-white hover:bg-gray-100 px-6"
          onClick={handleLogout}
        >
          Гарах
        </Button>
      </div>
    );
  }

  return (
    <Dialog>
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
        {isSignIn ? (
          <form onSubmit={handleLogin} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Input
                id="email"
                placeholder="Цахим хаяг"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Input
                id="password"
                placeholder="Нууц үг"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
              Нэвтрэх
            </Button>
          </form>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Input
                id="email"
                placeholder="Цахим хаяг/нэвтрэх нэр/"
                type="email"
              />
            </div>
            <div className="grid gap-2">
              <Input
                id="parhmacy-name"
                placeholder="Эмийн сангийн нэр"
                type="string"
              />
            </div>
            <div className="grid gap-2">
              <Input
                id="parhmacy-id"
                placeholder="Эмийн сангийн регистрийн дугаар"
                type="number"
              />
            </div>
            <div className="grid gap-2">
              <Input
                id="parhmacy-address"
                placeholder="Эмийн сангийн хаяг"
                type="string"
              />
            </div>
            <div className="grid gap-2">
              <Input id="password" placeholder="Нууц үг" type="password" />
            </div>
            <div className="grid gap-2">
              <Input
                id="confirm-password"
                placeholder="Нууц үг давтах"
                type="password"
              />
            </div>
          </div>
        )}
        <div className="text-center mt-4">
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline"
            onClick={() => setIsSignIn(!isSignIn)}
          >
            {isSignIn ? "Шинэ бүртгэл үүсгэх" : "Бүртгэлтэй хэрэглэгч нэвтрэх"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
