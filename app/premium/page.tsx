"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth.context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function PremiumPage() {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    checkPremiumStatus();
  }, []);

  const checkPremiumStatus = async () => {
    try {
      const response = await fetch("/api/users/premium-status", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to check premium status");
      }

      const data = await response.json();
      setIsPremium(data.isPremium);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isPremium) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Premium Content</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-4">
              This content is only available to premium members.
            </p>
            <Button className="w-full" onClick={() => router.push("/upgrade")}>
              Upgrade to Premium
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Premium Content</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add your premium content here */}
        <Card>
          <CardHeader>
            <CardTitle>Exclusive Content 1</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is premium content only available to premium members.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Exclusive Content 2</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is premium content only available to premium members.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Exclusive Content 3</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is premium content only available to premium members.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
