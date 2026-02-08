"use client"

import Image from "next/image";
import { motion } from "motion/react";

export default function ImageAnim() {
  return (
    <>
      {/* Gradient background using your theme colors */}
      <div 
        className="fixed inset-0 -z-20 opacity-10"
        style={{
          background: `linear-gradient(135deg, 
            var(--color-primary) 0%, 
            var(--color-secondary) 50%, 
            var(--color-accent) 100%
          )`
        }}
      />

        {/* Optional: Animated gradient overlay for more depth */}
      <div className="fixed inset-0 -z-10 bg-linear-to-r from-transparent via-black/10 to-transparent animate-pulse" />
            
     <motion.div 
        initial={{ y: -10, opacity: 0,scale:0.96 }}
        animate={{ y: 0, opacity: 1, scale:1 }}
        transition={{ delay: 1.8, duration: 0.4, ease: "easeOut" }} 
        className="absolute inset-0 -z-5 top-60 w-full h-full overflow-hidden">

        <Image 
          src={`/theBat.jpeg`} 
          alt="background" 
          fill
          className="object-cover md:block hidden"
          style={{
            maskImage: 'radial-gradient(circle at center, white 0%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(circle at center, white 0%, transparent 50%)'
          }}
        />
      </motion.div>
    </>
  )
}