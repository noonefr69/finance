import Link from "next/link";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type navLinks = {
  label: string;
  link: string;
};

export default function NavLinksMobile({ navLinks }: { navLinks: navLinks[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex md:hidden cursor-pointer">
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-[calc(100vw-2rem)] mx-4 mt-4 py-4"
      >
        <div className="flex flex-col items-center  font-semibold text-xl  gap-6">
          {navLinks.map((navLink, i) => (
            <Link
              className="w-full text-center duration-500"
              key={i}
              href={navLink.link}
            >
              {navLink.label}
            </Link>
          ))}
          Signin
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
