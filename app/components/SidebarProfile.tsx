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
              <DropdownMenuItem className="cursor-pointer">
                <form
                  className="w-full h-full"
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <button
                    type="submit"
                    className="text-start cursor-pointer flex items-center gap-1 w-full h-full"
                  >
                    <LogOut /> Sign out
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
