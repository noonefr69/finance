import React from "react";
import NavLinks from "./NavLinks";
import Logo from "./Logo";

export default function Headbar() {
  return (
    <div className="mx-10 mt-5 pb-5 flex items-center justify-between relative">
      <Logo />
      <NavLinks />
      <div className="md:flex hidden">SignIn</div>
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent dark:via-white/40 via-black/40 to-transparent" />
    </div>
  );
}
