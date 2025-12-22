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
        className="cursor-pointer bg-[rgb(100,74,64)]"
        onClick={() => setTheme("light")}
      >
        Light
      </Button>
      <Button
        className="cursor-pointer bg-[rgb(231,138,83)]"
        onClick={() => setTheme("dark")}
      >
        Dark
      </Button>
      <Button
        className="cursor-pointer bg-[rgb(255,224,194)]"
        onClick={() => setTheme("solar")}
      >
        Solar
      </Button>
    </div>
  );
}
