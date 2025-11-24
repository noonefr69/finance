import Link from "next/link";
import NavLinksDesktop from "./NavLinksDesktop";
import NavLinksMobile from "./NavLinksMobile";

export default function NavLinks() {
  const navLinks = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "About",
      link: "#about",
    },
    {
      label: "Blogs",
      link: "#blogs",
    },
    {
      label: "Contact",
      link: "#contact",
    },
  ];
  return (
    <div className="flex items-center ">
      <NavLinksDesktop navLinks={navLinks} />
      <NavLinksMobile navLinks={navLinks}/>
    </div>
  );
}
