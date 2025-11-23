import Link from "next/link";

type navLinks = {
  label: string;
  link: string;
};

export default function NavLinksDesktop({ navLinks }: { navLinks: navLinks[] }) {
  return (
    <div className="md:flex hidden absolute left-1/2 font-semibold text-xl -translate-x-1/2 items-center gap-6">
      {navLinks.map((navLink, i) => (
        <Link
          className="border-b-2 border-transparent duration-500 hover:border-white opacity-80 hover:opacity-100"
          key={i}
          href={navLink.link}
        >
          {navLink.label}
        </Link>
      ))}
    </div>
  );
}
