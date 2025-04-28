"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth/auth.context";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: (email: string, password: string) => Promise<void>;
  onRegister?: (data: {
    email: string;
    password: string;
    name: string;
    username: string;
    pharmacy_name: string;
    pharmacy_register_number: string;
    pharmacy_address: string;
    phone_number: number;
    payment_proof: string;
  }) => Promise<void>;
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
  const { login } = useAuth();

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
    try {
      if (onLogin) {
        await onLogin(loginEmail, loginPassword);
      } else {
        await login(loginEmail, loginPassword);
      }
      onClose(); // Close modal on successful login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Convert phone number to number
      const phoneNumber = parseInt(registerPhoneNumber.replace(/\D/g, ""), 10);

      // Create registration data object
      const registrationData = {
        email: registerEmail,
        password: registerPassword,
        name: registerName,
        username: registerUsername,
        pharmacy_name: registerPharmacyName,
        pharmacy_register_number: registerPharmacyRegisterNumber,
        pharmacy_address: registerPharmacyAddress,
        phone_number: phoneNumber,
        payment_proof: registerReceipt
          ? await fileToBase64(registerReceipt)
          : "",
      };

      if (onRegister) {
        await onRegister(registrationData);
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  // Helper function to convert File to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Нэвтрэх / Бүртгүүлэх</DialogTitle>
          <DialogDescription>
            Та өөрийн бүртгэлээр нэвтэрнэ үү эсвэл шинээр бүртгүүлнэ үү.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "login" | "register")}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Нэвтрэх</TabsTrigger>
            {onRegister && (
              <TabsTrigger value="register">Бүртгүүлэх</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-3">
              <div className="space-y-1">
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
              <div className="space-y-1">
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
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Нэвтэрч байна..." : "Нэвтрэх"}
              </Button>
            </form>
          </TabsContent>

          {onRegister && (
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
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
                  <div className="space-y-1">
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
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="register-name">Нэр</Label>
                    <Input
                      id="register-name"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="register-username">Username</Label>
                    <Input
                      id="register-username"
                      value={registerUsername}
                      onChange={(e) => setRegisterUsername(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-1">
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

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="register-pharmacy-register-number">
                      Регистрийн дугаар
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
                  <div className="space-y-1">
                    <Label htmlFor="register-phone-number">Утасны дугаар</Label>
                    <Input
                      id="register-phone-number"
                      value={registerPhoneNumber}
                      onChange={(e) => setRegisterPhoneNumber(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-1">
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

                <div className="space-y-1">
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

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Бүртгүүлж байна..." : "Бүргүүлэх"}
                </Button>
              </form>
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
