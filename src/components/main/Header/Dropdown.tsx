import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";

interface DropdownProps {
  label: string;
  items: {
    label: string;
    href: string;
  }[];
}

const Dropdown = ({ label, items }: DropdownProps) => {
  const [open, setOpen] = useState(false);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      const id = href.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className="px-4 py-2 hover:bg-gray-100 rounded-md transition duration-200"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {label}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-[200px]"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        sideOffset={0}
        align="start"
        avoidCollisions={false}
      >
        {items.map((item) => (
          <DropdownMenuItem key={item.href} className="cursor-pointer">
            <Link
              href={item.href}
              className="w-full px-2 py-1.5 hover:bg-gray-100 rounded-md transition duration-200"
              onClick={(e) => handleScroll(e, item.href)}
            >
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
