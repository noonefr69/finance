"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ToggleTheme() {
  const { setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-2">
      <Button
        className="cursor-pointer border w-9 h-9 bg-[#d5d5d5] hover:bg-[#d5d5d5] hover:opacity-80 rounded-full"
        onClick={() => setTheme("light")}
      ></Button>
      <Button
        className="cursor-pointer border bg-[#ffe0c2] hover:bg-[#ffe0c2] hover:opacity-80 rounded-full"
        onClick={() => setTheme("dark")}
      ></Button>
      <Button
        className="cursor-pointer border bg-[#aa96ca] hover:bg-[#aa96ca] hover:opacity-80 rounded-full"
        onClick={() => setTheme("solar")}
      ></Button>
      <Button
        className="cursor-pointer border bg-[#d04f99] hover:bg-[#d04f99] hover:opacity-80 rounded-full"
        onClick={() => setTheme("bubbleGum")}
      ></Button>
    </div>
  );
}
