"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { apiClient } from "@/lib/api/client";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    username: "",
    pharmacy_name: "",
    pharmacy_register_number: "",
    pharmacy_address: "",
    phone_number: "",
    payment_proof: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Нууц үг таарахгүй байна");
      return;
    }

    setIsLoading(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      await apiClient.register({
        ...registerData,
        phone_number: parseInt(registerData.phone_number)
      });
      router.push("/dashboard");
    } catch (err) {
      setError("Бүртгүүлэхэд алдаа гарлаа");
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
      {/* Right Side - Register Form */}
      <div className="flex flex-col justify-center w-full md:w-1/3 bg-white min-h-screen">
        <div className="w-full max-w-md mx-auto py-8 px-6">
          <div className="flex justify-center mb-4">
            <Image src="/branding/mrp.png" alt="Logo" width={60} height={60} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Бүртгүүлэх</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-0.5">
                И-мэйл
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                placeholder="Имэйл"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-0.5">
                Нэр
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                placeholder="Нэр"
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-0.5">
                Хэрэглэгчийн нэр
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                placeholder="Хэрэглэгчийн нэр"
              />
            </div>
            <div>
              <label htmlFor="pharmacy_name" className="block text-sm font-medium text-gray-700 mb-0.5">
                Эмийн сангийн нэр
              </label>
              <input
                id="pharmacy_name"
                name="pharmacy_name"
                type="text"
                required
                value={formData.pharmacy_name}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                placeholder="Эмийн сангийн нэр"
              />
            </div>
            <div>
              <label htmlFor="pharmacy_register_number" className="block text-sm font-medium text-gray-700 mb-0.5">
                Эмийн сангийн бүртгэлийн дугаар
              </label>
              <input
                id="pharmacy_register_number"
                name="pharmacy_register_number"
                type="text"
                required
                value={formData.pharmacy_register_number}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                placeholder="Эмийн сангийн бүртгэлийн дугаар"
              />
            </div>
            <div>
              <label htmlFor="pharmacy_address" className="block text-sm font-medium text-gray-700 mb-0.5">
                Эмийн сангийн хаяг
              </label>
              <input
                id="pharmacy_address"
                name="pharmacy_address"
                type="text"
                required
                value={formData.pharmacy_address}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                placeholder="Эмийн сангийн хаяг"
              />
            </div>
            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-0.5">
                Утасны дугаар
              </label>
              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                required
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                placeholder="Утасны дугаар"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-0.5">
                Нууц үг
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                placeholder="Нууц үг"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-0.5">
                Нууц үг давтах
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                placeholder="Нууц үг давтах"
              />
            </div>
            <div>
              <label htmlFor="payment_proof" className="block text-sm font-medium text-gray-700 mb-0.5">
                Төлбөрийн баримт
              </label>
              <input
                id="payment_proof"
                name="payment_proof"
                type="text"
                required
                value={formData.payment_proof}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                placeholder="Төлбөрийн баримт"
              />
            </div>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary/90 transition-colors duration-200 text-sm"
              disabled={isLoading}
            >
              {isLoading ? "Уншиж байна..." : "Бүртгүүлэх"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
