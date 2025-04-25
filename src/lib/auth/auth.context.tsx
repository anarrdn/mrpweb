"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { apiClient, User } from "../api/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    name: string;
    username: string;
    pharmacyName: string;
    pharmacyRegisterNumber: string;
    pharmacyAddress: string;
    phoneNumber: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        apiClient.setToken(token);
        const user = await apiClient.getProfile();
        setUser(user);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      await logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login({ email, password });
      setUser(response.user);
      toast.success("Successfully logged in");
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error instanceof Error ? error.message : "Login failed");
      throw error;
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    name: string;
    username: string;
    pharmacyName: string;
    pharmacyRegisterNumber: string;
    pharmacyAddress: string;
    phoneNumber: string;
  }) => {
    try {
      const response = await apiClient.register(data);
      setUser(response.user);
      toast.success("Registration successful");
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(
        error instanceof Error ? error.message : "Registration failed"
      );
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
      setUser(null);
      router.push("/");
      toast.success("Successfully logged out");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
