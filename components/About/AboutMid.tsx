import Image from "next/image";
import React from "react";

export default function AboutMid() {
  return (
    <div className="bg-secondary">
      <div className="flex items-center lg:flex-row flex-col-reverse  mt-10 max-w-7xl mx-auto gap-10 p-5 lg:p-10">
        <div className="relative  lg:w-1/2 h-105 w-full bg-gray-900 rounded-md dark:shadow-[9px_9px_0px_5px_gray] shadow-[9px_9px_0px_5px_rgba(0,0,0,1)]">
          <Image src={`/idea-1.webp`} alt="img" fill className="rounded-md" />
        </div>
        <div className="flex lg:w-1/2 flex-col gap-4">
          <h1 className="font-serif font-medium lg:px-10 lg:leading-22 text-5xl lg:text-6xl text-primary">
            Our Mission
          </h1>
          <p className="opacity-80 text-sm lg:text-[16px]">
            At <i>finance</i>, we believe that managing your money shouldn't be
            a second job. We exist to strip away the complexity of personal
            finance, replacing confusing spreadsheets with clear, actionable
            insights. Our goal is to give you the confidence to spend, save, and
            live without financial anxiety.
          </p>
          <h1 className="font-serif font-medium lg:px-10 lg:leading-22 text-5xl lg:text-6xl text-primary">
            Our Value
          </h1>
          <p className="opacity-80 text-sm lg:text-[16px]">
            Why We Built This We noticed a problem: most finance tools are
            either too complex for daily use or too simple to be useful. We
            wanted to build a bridge—a dashboard that is powerful enough to
            track every penny, but intuitive enough to use with your morning
            coffee.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
