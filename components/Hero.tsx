import React from "react";
import SingUpIn from "./SingUpIn";

export default function Hero() {
  return (
    <div className="text-center h-screen">
      <h1 className="text-4xl md:text-7xl font-bold px-4 lg:px-0 lg:w-2/3 pt-10 md:pt-20 mx-auto">
        Control Your Revenue and Insights
        <br className="2xl:block hidden" /> from One Dashboard
      </h1>
      <p className="lg:w-1/2 px-4  mx-auto py-5 opacity-80 text-sm md:text-[16px]">
        A modern dashboard platform built for speed, clarity, and control.
        Manage everything in one place with real-time insights, smart
        automation, and a beautifully simple interface designed to keep you
        focused on what matters.
      </p>
      <SingUpIn
        label="Sign up now"
        className={`flex w-fit mx-auto font-medium`}
      />
    </div>
  );
}
