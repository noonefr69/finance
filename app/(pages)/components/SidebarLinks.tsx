"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { SidebarProps } from "../types/sidebar";
import { usePathname } from "next/navigation";

export default function SidebarLinks({ items }: { items: SidebarProps[] }) {
  const pathName = usePathname();
  return (
    <>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link
              href={item.url}
              className={`duration-200 transition-all ${
                pathName === item.url ? "bg-accent" : ""
              }`}
            >
              <item.icon
                className={`duration-200 transition-all ${
                  pathName === item.url ? "text-primary" : ""
                }`}
                strokeWidth={pathName === item.url ? 3 : 2}
              />
              <span
                className={`${
                  pathName === item.url ? "font-bold" : ""
                } duration-200 transition-all`}
              >
                {item.title}
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
}
