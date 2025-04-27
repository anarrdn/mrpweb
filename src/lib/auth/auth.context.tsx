"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { apiClient } from "../api/client";
import { User } from "../api/types";
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
    payment_proof?: string;
  }) => Promise<void>;
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
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      apiClient.setToken(token);
      // Validate token and fetch user profile
      apiClient.validateToken()
        .then(isValid => {
          if (isValid) {
            return apiClient.getProfile();
          } else {
            throw new Error('Invalid token');
          }
        })
        .then(user => {
          setUser(user);
          setIsLoading(false);
        })
        .catch(() => {
          localStorage.removeItem('token');
          apiClient.setToken(null);
          setUser(null);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      console.log('Starting login process...');
      const response = await apiClient.login(email, password);
      console.log('Login response:', {
        token: response.token ? 'present' : 'missing',
        user: response.user,
        message: response.message
      });
      
      localStorage.setItem('token', response.token);
      apiClient.setToken(response.token);
      
      if (response.user) {
        console.log('Setting user:', response.user);
        setUser(response.user);
      } else {
        console.log('No user in response, fetching profile...');
        const profile = await apiClient.getProfile();
        console.log('Fetched profile:', profile);
        setUser(profile);
      }
      
      toast.success("Successfully logged in");
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials');
      throw err;
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
    payment_proof?: string;
  }) => {
    try {
      const response = await apiClient.register({
        ...data,
        payment_proof: data.payment_proof || "",
      });
      setUser(response.user);
      toast.success("Registration successful");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(
        error instanceof Error ? error.message : "Registration failed"
      );
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    apiClient.setToken(null);
    setUser(null);
    router.push("/");
    toast.success("Successfully logged out");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    error
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
