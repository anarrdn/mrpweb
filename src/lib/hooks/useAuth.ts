import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api/client";
import { User } from "@/lib/api/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const userData = await apiClient.getProfile();
        setUser(userData);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, []);

  return { user, isLoading };
}
