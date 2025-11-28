"use client";

import Link from "next/link";
import { motion } from "motion/react";

type navLinks = {
  label: string;
  link: string;
};

export default function NavLinksDesktop({
  navLinks,
}: {
  navLinks: navLinks[];
}) {
  return (
    <ul className="md:flex hidden absolute left-1/2 font-semibold text-xl -translate-x-1/2 items-center gap-6">
      {navLinks.map((navLink, i) => (
        <motion.li
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: i * 0.1 + 0.1,
            duration: 0.4,
            ease: "easeOut",
          }}
          key={i}
        >
          <Link
            className="duration-500 opacity-70 hover:opacity-100"
            href={navLink.link}
          >
            {navLink.label}
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
