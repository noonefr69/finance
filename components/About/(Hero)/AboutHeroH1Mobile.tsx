"use client";

import { motion } from "motion/react";

export default function AboutHeroH1Mobile() {
  return (
    <div className="lg:hidden flex justify-center">
      <motion.h1
        initial={{ y: -10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        About{" "}
        <i className="border-b-2 font-bold rounded-2xl px-2 border-b-accent">
          Finance
        </i>{" "}
        with Wellness and Productivity
      </motion.h1>
    </div>
  );
}
