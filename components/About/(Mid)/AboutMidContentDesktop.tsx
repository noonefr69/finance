"use client";

import { motion } from "motion/react";

export default function AboutMidContentDesktop() {
  return (
    <div className="lg:flex hidden flex-col gap-4">
      <motion.h1
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="font-serif font-medium lg:px-10 lg:leading-22 text-5xl lg:text-6xl text-primary"
      >
        Our Mission
      </motion.h1>
      <motion.p
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: "80%" }}
        transition={{ delay: 0.1, duration: 0.4 }}
        viewport={{ once: true }}
        className="opacity-80 text-sm lg:text-[16px]"
      >
        At <i>finance</i>, we believe that managing your money shouldn't be a
        second job. We exist to strip away the complexity of personal finance,
        replacing confusing spreadsheets with clear, actionable insights. Our
        goal is to give you the confidence to spend, save, and live without
        financial anxiety.
      </motion.p>
      <motion.h1
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        viewport={{ once: true }}
        className="font-serif font-medium lg:px-10 lg:leading-22 text-5xl lg:text-6xl text-primary"
      >
        Our Value
      </motion.h1>
      <motion.p
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: "80%" }}
        transition={{ delay: 0.3, duration: 0.4 }}
        viewport={{ once: true }}
        className="opacity-80 text-sm lg:text-[16px]"
      >
        Why We Built This We noticed a problem: most finance tools are either
        too complex for daily use or too simple to be useful. We wanted to build
        a bridge—a dashboard that is powerful enough to track every penny, but
        intuitive enough to use with your morning coffee.{" "}
      </motion.p>
    </div>
  );
}
