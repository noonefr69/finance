import React from "react";

export default function ProviderLoginWay({
  icon,
  label,
  way,
}: {
  icon: React.ReactNode;
  label: string;
  way: string;
}) {
  return (
    <form
      className="md:w-1/2"
      action={async () => {
        "use server";
        //   await signIn("github"); way
      }}
    >
      <button
        className="flex w-full dark:hover:border-white text-center justify-center gap-2 font-medium duration-200 items-center cursor-pointer  py-3 rounded-lg border-2"
        type="submit"
      >
        {icon}
        {label}
      </button>
    </form>
  );
}
