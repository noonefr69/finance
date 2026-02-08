"use client";

import SingUpIn from "./SingUpIn";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <div className="text-center md:h-screen mx-5 lg:mx-0">
      <motion.h1
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.4, ease: "easeOut" }}
        className="text-4xl md:text-7xl font-bold px-4 lg:px-0 lg:w-2/3 pt-10 md:pt-20 mx-auto"
      >
        Control Your Revenue and Insights
        <br className="2xl:block hidden" /> from One Dashboard
      </motion.h1>
      <motion.p
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.4, ease: "easeOut" }}
        className="lg:w-1/2 px-4 mx-auto py-5 opacity-80 text-sm md:text-[16px]"
      >
        A modern dashboard platform built for speed, clarity, and control.
        Manage everything in one place with real-time insights, smart
        automation, and a beautifully simple interface designed to keep you
        focused on what matters.
      </motion.p>
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.4, ease: "easeOut" }}
      >
        <SingUpIn
          label="Sign up now"
          className={`flex w-fit mx-auto font-medium`}
        />
      </motion.div>
    </div>
  );
}
