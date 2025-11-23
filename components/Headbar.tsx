import NavLinks from "./NavLinks";
import Logo from "./Logo";
import SingUpIn from "./SingUpIn";

export default function Headbar() {
  return (
    <div className="mx-10 mt-5 pb-5 flex items-center justify-between relative">
      <Logo />
      <NavLinks />
      <SingUpIn className={`md:flex hidden px-3 py-2 font-medium`} />
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent dark:via-white/40 via-black/40 to-transparent" />
    </div>
  );
}
