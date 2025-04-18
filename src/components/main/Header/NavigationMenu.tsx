import Link from "next/link";
import { MENU } from "@/lib/config";
import { DROPDOWN_ITEMS } from "./dropdownContents";
import Dropdown from "./Dropdown";

export const NavigationMenu = () => {
  return (
    <div className="flex items-center gap-4">
      <Link
        href="/"
        className="px-4 py-2 hover:bg-gray-100 rounded-md transition duration-200"
      >
        Нүүр
      </Link>
      <div className="flex items-center gap-4">
        {MENU.map((item) => (
          <div key={item.href} className="relative">
            {DROPDOWN_ITEMS[item.label as keyof typeof DROPDOWN_ITEMS] ? (
              <Dropdown
                label={item.label}
                items={
                  DROPDOWN_ITEMS[item.label as keyof typeof DROPDOWN_ITEMS]
                }
              />
            ) : (
              <Link
                href={`/#${item.href}`}
                className="px-4 py-2 hover:bg-gray-100 rounded-md transition duration-200"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
