"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { api, User } from "../api/client";
import Cookies from "js-cookie";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    pharmacyId: string,
    pharmacyAddress: string
  ) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  isApproved: boolean;
  updateUserRole: (role: "user" | "admin") => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_COOKIE = "token";
const TOKEN_EXPIRY = 7; // 7 days

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = Cookies.get(TOKEN_COOKIE);
        const userData = Cookies.get("user");

        if (token) {
          api.setToken(token);
          try {
            const userProfile = await api.getProfile();
            if (userProfile) {
              setUser(userProfile);
              // Store user data in cookie for middleware
              Cookies.set("user", JSON.stringify(userProfile), {
                expires: TOKEN_EXPIRY,
                secure: true,
                sameSite: "strict",
              });
            }
          } catch (profileError) {
            console.error("Error fetching profile:", profileError);
            // If profile fetch fails, try to refresh token
            try {
              const response = await api.refreshToken();
              if (response.token) {
                api.setToken(response.token);
                const refreshedProfile = await api.getProfile();
                if (refreshedProfile) {
                  setUser(refreshedProfile);
                  Cookies.set("user", JSON.stringify(refreshedProfile), {
                    expires: TOKEN_EXPIRY,
                    secure: true,
                    sameSite: "strict",
                  });
                } else {
                  throw new Error("Failed to get profile after refresh");
                }
              } else {
                throw new Error("Token refresh failed");
              }
            } catch (refreshError) {
              console.error("Token refresh failed:", refreshError);
              // If refresh fails, clear everything
              Cookies.remove(TOKEN_COOKIE);
              Cookies.remove("user");
              api.setToken(null);
              setUser(null);
            }
          }
        } else if (userData) {
          // If we have user data but no token, try to refresh
          try {
            const response = await api.refreshToken();
            if (response.token) {
              api.setToken(response.token);
              setUser(JSON.parse(userData));
            } else {
              throw new Error("Token refresh failed");
            }
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            Cookies.remove(TOKEN_COOKIE);
            Cookies.remove("user");
            api.setToken(null);
            setUser(null);
          }
        } else {
          // No token or user data found, ensure clean state
          api.setToken(null);
          setUser(null);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        // Ensure clean state on any error
        Cookies.remove(TOKEN_COOKIE);
        Cookies.remove("user");
        api.setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Add a listener for storage events to sync auth state across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === TOKEN_COOKIE) {
        if (!e.newValue) {
          // Token was removed in another tab
          setUser(null);
        } else if (e.newValue !== api.getToken()) {
          // Token was updated in another tab
          api.setToken(e.newValue);
          api
            .getProfile()
            .then(setUser)
            .catch(() => setUser(null));
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log("Attempting login with email:", email);
      const response = await api.login({ email, password });
      console.log("Login response:", response);

      if (!response) {
        console.error("No response received from login");
        throw new Error("No response received from login");
      }
      if (!response.user) {
        console.error("No user data received from login");
        throw new Error("No user data received from login");
      }
      if (!response.token) {
        console.error("No token received from login");
        throw new Error("No token received from login");
      }

      console.log("Login successful, setting user and token");
      Cookies.set(TOKEN_COOKIE, response.token, {
        expires: TOKEN_EXPIRY,
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("user", JSON.stringify(response.user), {
        expires: TOKEN_EXPIRY,
        secure: true,
        sameSite: "strict",
      });
      api.setToken(response.token);
      setUser(response.user);
    } catch (error) {
      console.error("Login failed with error:", error);
      throw error;
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    pharmacyId: string,
    pharmacyAddress: string
  ) => {
    try {
      const newUser = await api.register({
        email,
        password,
        name,
        pharmacyId,
        pharmacyAddress,
      });
      setUser(newUser);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove(TOKEN_COOKIE);
    Cookies.remove("user");
    api.setToken(null);
    setUser(null);
  };

  const updateUserRole = async (role: "user" | "admin") => {
    if (!user) return;
    try {
      const updatedUser = await api.updateUserRole(user.id, role);
      setUser(updatedUser);
    } catch (error) {
      console.error("Failed to update role:", error);
      throw error;
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
    isApproved: user?.status === "approved",
    updateUserRole,
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
