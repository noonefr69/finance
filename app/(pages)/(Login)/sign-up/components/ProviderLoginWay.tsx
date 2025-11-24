import React from "react";

type ProviderLoginWayProps = {
  icon: React.ReactNode;
  label: string;
  way: string; // you can replace with a union like "github" | "google" later
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
        "use server";
        // await signIn(way);
      }}
    >
      <button
        type="submit"
        aria-label={label} // important when text is hidden
        title={label} // simple tooltip on hover / long-press
        className="
          flex items-center justify-center gap-2 w-full
          py-3 rounded-lg border-2 font-medium cursor-pointer
          duration-200
          hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2
        "
      >
        <span className="flex-none">{icon}</span>

        {/* label visible from md and up, hidden on small screens */}
        <span className="hidden md:inline-block">{label}</span>
      </button>
    </form>
  );
}
