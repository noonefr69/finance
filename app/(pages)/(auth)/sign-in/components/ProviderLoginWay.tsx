import { Button } from "@/components/ui/button";
import React from "react";

type ProviderLoginWayProps = {
  icon: React.ReactNode;
  label: string;
  way: string;
};

export default function ProviderLoginWay({
  icon,
  label,
  way,
}: ProviderLoginWayProps) {
  return (
    <form
      className="w-full md:w-1/2"
      action={async () => {
        // "use server";
        // await signIn(way);
      }}
    >
      <Button
      variant={"ghost"}
        type="submit"
        aria-label={label}
        title={label}
        className="
          flex items-center justify-center gap-2 w-full py-6 rounded-lg border-2 font-medium cursor-pointer duration-200 focus:outline-none hover:ring-2"
      >
        <span className="flex-none">{icon}</span>
        <span className="hidden md:inline-block">{label}</span>
      </Button>
    </form>
  );
}
