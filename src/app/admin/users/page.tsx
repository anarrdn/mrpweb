"use client";

import { useState, useEffect } from "react";
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
import { apiClient } from "@/lib/api/client";
import { useToast } from "@/components/ui/use-toast";
import { Eye, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  isAdmin: boolean;
  pharmacyName?: string;
  phoneNumber?: string;
  address?: string;
  isApproved?: boolean;
  paymentProof?: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  pharmacyRegisterNumber?: string;
  pharmacyAddress?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState<{
    url: string;
    type: "image" | "pdf";
  } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiClient.getUsers();
      setUsers(response);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    userId: string,
    newStatus: "approved" | "rejected"
  ) => {
    try {
      await apiClient.updateUserStatus(userId, newStatus);
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );
      toast({
        title: "Success",
        description: `User status updated to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Хэрэглэгчид</h1>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Нэр</TableHead>
              <TableHead>И-мэйл</TableHead>
              <TableHead>Утас</TableHead>
              <TableHead>Төлөв</TableHead>
              <TableHead>Баримт бичиг</TableHead>
              <TableHead>Үйлдэл</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell>
                  {user.paymentProof && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setSelectedDocument({
                          url: user.paymentProof || "",
                          type: "image",
                        })
                      }
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Үзэх
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {user.status === "pending" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600"
                          onClick={() =>
                            handleStatusChange(user.id, "approved")
                          }
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Зөвшөөрөх
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600"
                          onClick={() =>
                            handleStatusChange(user.id, "rejected")
                          }
                        >
                          <X className="w-4 h-4 mr-1" />
                          Татгалзах
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={!!selectedDocument}
        onOpenChange={() => setSelectedDocument(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Баримт бичиг</DialogTitle>
          </DialogHeader>
          {selectedDocument && (
            <div className="mt-4">
              {selectedDocument.type === "image" ? (
                <img
                  src={selectedDocument.url}
                  alt="User document"
                  className="max-w-full h-auto"
                />
              ) : (
                <iframe
                  src={selectedDocument.url}
                  className="w-full h-[600px]"
                  title="User document"
                />
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
