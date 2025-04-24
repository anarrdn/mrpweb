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
import { toast } from "sonner";

const AuthModal = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isAuthenticated, login, logout } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [pharmacyId, setPharmacyId] = useState("");
  const [pharmacyAddress, setPharmacyAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      toast.success("Амжилттай нэвтэрлээ");
      // Close the dialog after successful login
      const dialog = document.querySelector('[role="dialog"]');
      if (dialog) {
        (dialog as HTMLElement).style.display = "none";
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Нэвтрэх нэр эсвэл нууц үг буруу байна";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      // Validate passwords match
      if (password !== confirmPassword) {
        setError("Нууц үг таарахгүй байна");
        return;
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
          pharmacyId,
          pharmacyAddress,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Бүртгэл үүсгэхэд алдаа гарлаа");
      }

      toast.success("Бүртгэл амжилттай үүслээ! Одоо нэвтэрнэ үү.");

      // Close the dialog after successful registration
      const dialog = document.querySelector('[role="dialog"]');
      if (dialog) {
        (dialog as HTMLElement).style.display = "none";
      }

      // Switch to login form
      setIsSignIn(true);

      // Clear form fields
      setEmail("");
      setPassword("");
      setName("");
      setPharmacyId("");
      setPharmacyAddress("");
      setConfirmPassword("");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Бүртгэл үүсгэхэд алдаа гарлаа";
      setError(errorMessage);
      toast.error(errorMessage);
    }
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
            {error && isSignIn && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            <Button type="submit" className="w-full">
              Нэвтрэх
            </Button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Input
                id="email"
                placeholder="Цахим хаяг/нэвтрэх нэр/"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Input
                id="parhmacy-name"
                placeholder="Эмийн сангийн нэр"
                type="string"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Input
                id="parhmacy-id"
                placeholder="Эмийн сангийн регистрийн дугаар"
                type="number"
                value={pharmacyId}
                onChange={(e) => setPharmacyId(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Input
                id="parhmacy-address"
                placeholder="Эмийн сангийн хаяг"
                type="string"
                value={pharmacyAddress}
                onChange={(e) => setPharmacyAddress(e.target.value)}
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
            <div className="grid gap-2">
              <Input
                id="confirm-password"
                placeholder="Нууц үг давтах"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && !isSignIn && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            <Button type="submit" className="w-full">
              Бүртгүүлэх
            </Button>
          </form>
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
