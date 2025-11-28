"use client";

import { motion } from "motion/react";

export default function AboutHeroPDesktop() {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      whileInView={{ x: 0, opacity: "80%" }}
      transition={{ delay: 0.3, duration: 0.4 }}
      viewport={{ once: true }}
      className="lg:mx-14 flex-col opacity-80 lg:flex hidden"
    >
      Wherever you are should not be a factor in what you do. Brilliant
      well-being and Productivity at one time will change the way the world
      works.
    </motion.div>
  );
}
