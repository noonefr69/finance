import { auth, signOut } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import UserName from "./UserName";
import EditButtonClicker from "./EditButtonClicker";
import { getUserName } from "../actions/getUserName";
import SignOutButton from "./SignOutButton";

export default async function SidebarProfile() {
  const rawUserName = await getUserName();
  const userName = JSON.parse(JSON.stringify(rawUserName));

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <UserName userName={userName.data} />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" className="w-56">
              <EditButtonClicker userName={userName.data} />
              <SignOutButton />
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
