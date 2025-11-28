"use client";

import { motion } from "motion/react";

export default function AboutHeroPMobile() {
  return (
    <motion.p
      initial={{ y: -10, opacity: 0 }}
      whileInView={{ y: 0, opacity: "80%" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="lg:mx-14 opacity-80 lg:hidden block"
    >
      Wherever you are should not be a factor in what you do. Brilliant
      well-being and Productivity at one time will change the way the world
      works.
    </motion.p>
  );
}
