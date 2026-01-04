"use client";

import Logo from "@/components/Logo";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export default function SidebarLogo() {
  const { open } = useSidebar();

  return (
    <SidebarHeader className="px-4 pt-4">
      <SidebarMenu>
        <SidebarMenuItem
          className={`overflow-hidden transition-all duration-200 ${
            open ? "w-full" : "w-3.5"
          } `}
        >
          <Logo />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
