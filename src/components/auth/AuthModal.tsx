"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (formData: FormData) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export default function AuthModal({
  isOpen,
  onClose,
  onLogin,
  onRegister,
  isLoading = false,
  error = "",
}: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPharmacyName, setRegisterPharmacyName] = useState("");
  const [registerReceipt, setRegisterReceipt] = useState<File | null>(null);
  const [registerPharmacyRegisterNumber, setRegisterPharmacyRegisterNumber] =
    useState("");
  const [registerPharmacyAddress, setRegisterPharmacyAddress] = useState("");
  const [registerPhoneNumber, setRegisterPhoneNumber] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await onLogin(loginEmail, loginPassword);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // Use FormData for file upload
    const formData = new FormData();
    formData.append("email", registerEmail);
    formData.append("password", registerPassword);
    formData.append("name", registerName);
    formData.append("username", registerUsername);
    formData.append("pharmacy_name", registerPharmacyName);
    if (registerReceipt) formData.append("receipt", registerReceipt);
    formData.append("pharmacy_register_number", registerPharmacyRegisterNumber);
    formData.append("pharmacy_address", registerPharmacyAddress);
    formData.append("phone_number", registerPhoneNumber);
    await onRegister(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Нэвтрэх / Бүртгүүлэх</DialogTitle>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "login" | "register")}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Нэвтрэх</TabsTrigger>
            <TabsTrigger value="register">Бүртгүүлэх</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">И-мэйл</Label>
                <Input
                  id="login-email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Нууц үг</Label>
                <Input
                  id="login-password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Нэвтэрч байна..." : "Нэвтрэх"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-email">И-мэйл</Label>
                <Input
                  id="register-email"
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-name">Нэр</Label>
                <Input
                  id="register-name"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-username">Username</Label>
                <Input
                  id="register-username"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Нууц үг</Label>
                <Input
                  id="register-password"
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-pharmacy-name">
                  Эмийн сангийн нэр
                </Label>
                <Input
                  id="register-pharmacy-name"
                  value={registerPharmacyName}
                  onChange={(e) => setRegisterPharmacyName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-receipt">Receipt (file)</Label>
                <Input
                  id="register-receipt"
                  type="file"
                  onChange={(e) =>
                    setRegisterReceipt(e.target.files?.[0] || null)
                  }
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-pharmacy-register-number">
                  Эмийн сангийн регистрийн дугаар
                </Label>
                <Input
                  id="register-pharmacy-register-number"
                  value={registerPharmacyRegisterNumber}
                  onChange={(e) =>
                    setRegisterPharmacyRegisterNumber(e.target.value)
                  }
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-pharmacy-address">
                  Эмийн сангийн хаяг
                </Label>
                <Input
                  id="register-pharmacy-address"
                  value={registerPharmacyAddress}
                  onChange={(e) => setRegisterPharmacyAddress(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-phone-number">Утасны дугаар</Label>
                <Input
                  id="register-phone-number"
                  value={registerPhoneNumber}
                  onChange={(e) => setRegisterPhoneNumber(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Бүртгүүлж байна..." : "Бүртгүүлэх"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
