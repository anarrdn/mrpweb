import { Button } from "./button";
import { useAuth } from "@/lib/auth/auth.context";
import { Pencil } from "lucide-react";
import { useState, useEffect } from "react";

interface EditButtonProps {
  onClick: () => void;
  className?: string;
}

export function EditButton({ onClick, className = "" }: EditButtonProps) {
  const { user, isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={`fixed top-4 right-4 z-[100] bg-white/80 hover:bg-white ${className}`}
    >
      <Pencil className="h-4 w-4" />
    </Button>
  );
}
