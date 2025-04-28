"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isApproved: boolean;
  payment_proof?: string;
  payment_status?: string;
  createdAt: string;
}

export function UserManagementTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getUsers();
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId: string) => {
    try {
      await apiClient.updateUserStatus(userId, true);
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, isApproved: true } : user
        )
      );
    } catch (err) {
      setError("Failed to update user status");
      console.error(err);
    }
  };

  const handleReject = async (userId: string) => {
    try {
      await apiClient.updateUserStatus(userId, false);
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, isApproved: false } : user
        )
      );
    } catch (err) {
      setError("Failed to update user status");
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment Proof</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Badge variant={user.isApproved ? "success" : "destructive"}>
                  {user.isApproved ? "Approved" : "Pending"}
                </Badge>
              </TableCell>
              <TableCell>
                {user.payment_proof ? (
                  <a
                    href={user.payment_proof}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Proof
                  </a>
                ) : (
                  "No proof"
                )}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    user.payment_status === "paid" ? "success" : "destructive"
                  }
                >
                  {user.payment_status || "Unpaid"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {!user.isApproved && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleApprove(user.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  {user.isApproved && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReject(user.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
