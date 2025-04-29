"use client";

import * as React from "react";
import Link from "next/link";
import { MENU } from "@/lib/config";
import { DROPDOWN_ITEMS } from "./dropdownContents";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const NewNavigation = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" className={cn(
            navigationMenuTriggerStyle(),
            "bg-[#00b1ad] text-white hover:text-[#00b1ad] focus:text-[#00b1ad]"
          )}>
            Нүүр
          </Link>
        </NavigationMenuItem>

        {MENU.map((item) => {
          const dropdownItems = DROPDOWN_ITEMS[item.label as keyof typeof DROPDOWN_ITEMS];
          
          if (dropdownItems) {
            return (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuTrigger className="bg-[#00b1ad] text-white hover:bg-white focus:bg-white hover:text-[#00b1ad] focus:text-[#00b1ad] data-[state=open]:text-white data-[active]:text-white">
                  {item.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-full gap-0 md:grid-cols-2 lg:grid-cols-3">
                    {dropdownItems.map((dropdownItem) => (
                      <ListItem
                        key={dropdownItem.href}
                        href={dropdownItem.href}
                        title={dropdownItem.label}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={item.href}>
              <Link href={`/#${item.href}`} className={cn(navigationMenuTriggerStyle(), "bg-[#00b1ad] text-white hover:text-white focus:text-white")}>
                {item.label}
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="w-full">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block w-full px-6 py-4 text-black hover:text-black focus:text-black hover:bg-accent focus:bg-accent text-left",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default NewNavigation; 