"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { apiClient } from "../api/client";
import { User, RegisterRequest } from "../api/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const validateToken = async () => {
      try {
        // Initialize token from localStorage
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          apiClient.setToken(storedToken);
        }

        const isValid = await apiClient.validateToken();
        if (isValid) {
          const user = await apiClient.getProfile();
          if (user) {
            setUser(user);
          }
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        // Clear invalid token
        apiClient.clearToken();
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiClient.login(email, password);
      if (response.user) {
        setUser(response.user);
        router.push("/dashboard");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const adminLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Starting admin login...");
      const response = await apiClient.adminLogin(email, password);
      console.log("Admin login response:", response);

      if (response.user && response.user.is_active) {
        console.log("Setting admin user:", response.user);
        setUser(response.user);
        console.log("Redirecting to admin dashboard...");
        // Use window.location.href for a full page reload to ensure state is properly set
        window.location.href = "/admin/dashboard";
      } else {
        console.error("User is not an admin:", response.user);
        throw new Error("User is not an admin");
      }
    } catch (error) {
      console.error("Admin login error:", error);
      setError(error instanceof Error ? error.message : "Admin login failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiClient.register(data);
      if (response.user) {
        setUser(response.user);
        router.push("/dashboard");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    apiClient.logout();
    setUser(null);
    router.push("/");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    isAdmin: user?.is_active === true,
    login,
    adminLogin,
    register,
    logout,
    error,
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
