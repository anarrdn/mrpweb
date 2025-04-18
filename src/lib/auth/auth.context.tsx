"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import api from "../api/axios";
import { fetchAPI } from "../api/fetch";

interface User {
  email: string;
  role: string;
  name?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Mock admin credentials for testing
const MOCK_ADMIN = {
  email: "admin@medtech.com",
  password: "admin123",
  userData: {
    email: "admin@medtech.com",
    role: "admin",
    name: "Admin User",
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      const savedAuth = localStorage.getItem("auth");
      if (savedAuth) {
        try {
          const parsed = JSON.parse(savedAuth);
          return parsed.isAuthenticated;
        } catch (error) {
          console.error("Error parsing saved auth:", error);
        }
      }
    }
    return false;
  });

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const savedAuth = localStorage.getItem("auth");
      if (savedAuth) {
        try {
          const parsed = JSON.parse(savedAuth);
          return parsed.user;
        } catch (error) {
          console.error("Error parsing saved auth:", error);
        }
      }
    }
    return null;
  });

  const login = async (email: string, password: string) => {
    try {
      // Mock authentication for testing
      if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
        setIsAuthenticated(true);
        setUser(MOCK_ADMIN.userData);
        // Save auth state to localStorage
        localStorage.setItem(
          "auth",
          JSON.stringify({
            isAuthenticated: true,
            user: MOCK_ADMIN.userData,
          })
        );
        return;
      }

      // If credentials don't match, throw error
      throw new Error("Invalid credentials");

      // Uncomment these when you have a real backend
      // const response = await api.post("/auth/login", { email, password });
      // setIsAuthenticated(true);
      // setUser(response.data);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Clear auth state from localStorage
      localStorage.removeItem("auth");
      setIsAuthenticated(false);
      setUser(null);

      // Uncomment these when you have a real backend
      // await api.post("/auth/logout");
      // setIsAuthenticated(false);
      // setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
