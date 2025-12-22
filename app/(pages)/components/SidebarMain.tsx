import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import SidebarLinks from "./SidebarLinks";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronRight, HelpCircle, MessageSquareWarning, SunMoon } from "lucide-react";
import { ToggleTheme } from "./ToggleTheme";
import Link from "next/link";
import { mains } from "../types/mains.client";

export default function SidebarMain() {
  return (
    <SidebarContent className="">
      <SidebarGroup>
        <SidebarGroupLabel>Main</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarLinks items={mains} />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Settings</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Popover>
                <PopoverTrigger asChild>
                  <SidebarMenuButton className="cursor-pointer ">
                    <SunMoon />
                    <span>Themes</span>
                    <ChevronRight className="absolute right-1"/>
                  </SidebarMenuButton>
                </PopoverTrigger>
                <PopoverContent side="right" align="start" className="w-fit">
                  <ToggleTheme />
                </PopoverContent>
              </Popover>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={`/help`}>
                  <HelpCircle />
                  <span>Help</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={`/help`}>
                  <MessageSquareWarning />
                  <span>Send feedback</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
