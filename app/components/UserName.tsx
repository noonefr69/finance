import { SidebarMenuButton } from "@/components/ui/sidebar";
import { ChevronUp, User2 } from "lucide-react";
import { Session } from "next-auth";
export default function UserName({ userName }: { userName: { name: string } }) {
  return (
    <SidebarMenuButton className="space-x-1 cursor-pointer">
      <User2 />
      {userName.name && userName.name.length > 20
        ? userName.name.slice(0, 20) + "..."
        : userName.name}
      <ChevronUp className="ml-auto" />
    </SidebarMenuButton>
  );
}
