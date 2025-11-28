"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function AboutMidImgMobile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      viewport={{ once: true }}
      className="relative lg:hidden flex lg:w-1/2 h-72 mb-5 w-full bg-gray-900 rounded-md dark:shadow-[9px_9px_0px_5px_gray] shadow-[9px_9px_0px_5px_rgba(0,0,0,1)]"
    >
      <Image src={`/idea-1.webp`} alt="img" fill className="rounded-md" />
    </motion.div>
  );
}
