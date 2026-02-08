"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function ImagePart() {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="lg:w-2/5"
    >
      <Image src={`/nerdCat.jpg`} alt="nerd cat" width={900} height={400} />
    </motion.div>
  );
}
