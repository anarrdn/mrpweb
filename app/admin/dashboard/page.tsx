"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/auth.context";
import { useRouter } from "next/navigation";
import { User } from "@/lib/api/client";
import { api } from "@/lib/api/client";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminDashboard() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      router.push("/");
      return;
    }
    fetchUsers();
  }, [isAuthenticated, user, router]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.listUsers();
      setUsers(response.data);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  const handleApprove = async (userId: string) => {
    try {
      await api.approveUser(userId);
      toast.success("User approved successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to approve user");
    }
  };

  const handleReject = async (userId: string) => {
    try {
      await api.rejectUser(userId);
      toast.success("User rejected successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to reject user");
    }
  };

  const handlePremiumToggle = async (userId: string, isPremium: boolean) => {
    try {
      await api.updateUserPremium(userId, !isPremium);
      toast.success(
        `User ${isPremium ? "removed from" : "added to"} premium successfully`
      );
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update premium status");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.pharmacyId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <Input
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-gray-600">
                    Pharmacy ID: {user.pharmacyId}
                  </p>
                  <p className="text-gray-600">
                    Address: {user.pharmacyAddress}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge
                    variant={
                      user.status === "APPROVED"
                        ? "success"
                        : user.status === "REJECTED"
                        ? "destructive"
                        : "default"
                    }
                  >
                    {user.status}
                  </Badge>
                  <Badge variant={user.isPremium ? "secondary" : "default"}>
                    {user.isPremium ? "Premium" : "Standard"}
                  </Badge>
                  <div className="flex gap-2">
                    {user.status === "PENDING" && (
                      <>
                        <Button
                          variant="success"
                          onClick={() => handleApprove(user.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleReject(user.id)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {user.status === "APPROVED" && (
                      <Button
                        variant={user.isPremium ? "destructive" : "default"}
                        onClick={() =>
                          handlePremiumToggle(user.id, user.isPremium)
                        }
                      >
                        {user.isPremium ? "Remove Premium" : "Make Premium"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
