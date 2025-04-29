"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { apiClient } from "@/lib/api/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await apiClient.login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError("Нэвтрэх нэр эсвэл нууц үг буруу байна");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image only */}
      <div className="hidden md:flex w-2/3 bg-[#0d1b2a] relative overflow-hidden">
        <Image
          src="/branding/consultation.jpg"
          alt="Consultation"
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        {/* Overlay: Logo and Titles */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg whitespace-nowrap">
            МОНГОЛЫН ЭМ ХАНГАМЖИЙН ШИНЭЧЛЭЛ ХОЛБОО
          </h1>
          <p className="text-white/90 text-base md:text-lg font-medium drop-shadow max-w-2xl">
            НИЙТИЙН ҮЙЛЧИЛЛГЭЭТЭЙ ЭМИЙН САНГУУДЫН НЭГДСЭН ГИШҮҮДДЭЭ ҮЙЛЧИЛДЭГ ТӨРИЙН БУС БАЙГУУЛЛАГА
          </p>
        </div>
      </div>
      {/* Right Side - Login Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/3 bg-white min-h-screen px-6 py-12">
        <div className="w-full max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <Image src="/branding/mrp.png" alt="Logo" width={80} height={80} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Нэвтрэх</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                И-мэйл
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Имэйл"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Нууц үг
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Нууц үг"
              />
            </div>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary/90 transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Уншиж байна..." : "Нэвтрэх"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}




