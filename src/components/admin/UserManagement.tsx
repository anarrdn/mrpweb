"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/auth.context";
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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface UserManagementProps {
  showActions?: boolean;
  onUserAction?: () => void;
}

export default function UserManagement({ showActions = true, onUserAction }: UserManagementProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await apiClient.listUsers();
      setUsers(response);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId: string) => {
    try {
      await apiClient.approveUser(userId);
      toast.success("User approved successfully");
      fetchUsers();
      onUserAction?.();
    } catch (error) {
      toast.error("Failed to approve user");
    }
  };

  const handleReject = async (userId: string) => {
    try {
      await apiClient.rejectUser(userId);
      toast.success("User rejected successfully");
      fetchUsers();
      onUserAction?.();
    } catch (error) {
      toast.error("Failed to reject user");
    }
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              {showActions && isAdmin && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === "approved"
                        ? "success"
                        : user.status === "pending"
                        ? "warning"
                        : "destructive"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                {showActions && isAdmin && (
                  <TableCell>
                    <div className="flex gap-2">
                      {user.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleApprove(user.id)}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(user.id)}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 