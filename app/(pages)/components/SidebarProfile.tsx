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
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChevronUp, Edit, LogOut, User2 } from "lucide-react";

export default async function SidebarProfile() {
  const session = await auth();
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="space-x-1 cursor-pointer">
                <User2 /> {session?.user?.name}
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" className="w-56">
              <DropdownMenuItem className="cursor-pointer">
                <span className="flex items-center gap-1">
                  <Edit /> Edit
                </span>
              </DropdownMenuItem>
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
