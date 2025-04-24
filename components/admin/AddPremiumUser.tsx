"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/auth.context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function AddPremiumUser() {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/users/premium", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, token }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add premium user");
      }

      toast.success("User upgraded to premium successfully");
      setUserId("");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add premium user"
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add Premium User</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="userId" className="text-sm font-medium">
              User ID
            </label>
            <Input
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user ID"
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Processing..." : "Add Premium User"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
