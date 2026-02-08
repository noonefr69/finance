"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function AboutHeroImgMobile() {
  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.8 }}
      viewport={{ once: true }}
      className="relative md:h-72 h-52 w-full lg:hidden flex bg-gray-900 rounded-md dark:shadow-[9px_9px_0px_5px_gray] shadow-[9px_9px_0px_5px_rgba(0,0,0,1)]"
    >
      <Image src={`/eye.png`} alt="img" fill className="grayscale brightness-50 contrast-125 saturate-0 rounded-md" />
    </motion.div>
  );
}
