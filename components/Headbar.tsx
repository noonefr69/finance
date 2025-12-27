"use client";

import { motion } from "motion/react";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import SingUpIn from "./SingUpIn";

export default function Headbar() {
  return (
    <div className="mx-5 mt-5 pb-5 flex items-center justify-between relative">
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Logo className="" />
      </motion.div>
      <NavLinks />
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
      >
        <SingUpIn
          label="Sign Up/In"
          className={`invisible hidden md:visible md:flex font-medium`}
        />
      </motion.div>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100%", opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-0.5 bg-linear-to-r from-transparent via-accent-foreground/40 to-transparent"
      />
    </div>
  );
}
