import { signOut } from "@/auth";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
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
  );
}
