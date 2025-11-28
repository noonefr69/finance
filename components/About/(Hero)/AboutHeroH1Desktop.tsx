"use client";

import { motion } from "motion/react";

export default function AboutHeroH1Desktop() {
  return (
    <div className="hiddenlg:flex flex-col gap-10 items-center">
      <motion.div className="overflow-hidden lg:flex hidden justify-center">
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="pb-3"
        >
          About{" "}
          <i className="border-b-2 font-bold rounded-2xl px-2 border-b-accent">
            Finance
          </i>{" "}
        </motion.h1>
      </motion.div>
      <motion.div className="overflow-hidden lg:flex hidden justify-center">
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          viewport={{ once: true }}
          className="pb-3"
        >
          with Wellness
        </motion.h1>
      </motion.div>
      <motion.div className="overflow-hidden lg:flex hidden justify-center">
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          viewport={{ once: true }}
          className=""
        >
          and Productivity
        </motion.h1>
      </motion.div>
    </div>
  );
}
