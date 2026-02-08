"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function AboutMidImgDesktop() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="relative lg:flex hidden lg:w-1/2 h-105 w-full bg-gray-900 rounded-md dark:shadow-[9px_9px_0px_5px_gray] shadow-[9px_9px_0px_5px_rgba(0,0,0,1)]"
    >
      <Image src={`/cool.png`} alt="img" fill className="grayscale brightness-50 contrast-125 saturate-0 rounded-md" />
    </motion.div>
  );
}
