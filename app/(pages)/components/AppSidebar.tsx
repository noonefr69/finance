import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Logo from "@/components/Logo";
import Link from "next/link";
import MainLinks from "./SidebarLinks";
import SidebarLinks from "./SidebarLinks";
import { mains } from "../types/sidebar";
import { HelpCircle, Home, MessageSquareWarning, SunMoon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleTheme } from "./ToggleTheme";
import SidebarLogo from "./SidebarLogo";
import SidebarProfile from "./SidebarProfile";

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="floating" className="">
      <SidebarLogo />
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
                    <SidebarMenuButton className="cursor-pointer">
                      <SunMoon />
                      <span>Themes</span>
                    </SidebarMenuButton>
                  </PopoverTrigger>
                  <PopoverContent side="bottom" align="start" className="w-fit">
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
      <SidebarProfile />
    </Sidebar>
  );
}
