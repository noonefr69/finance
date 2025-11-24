import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { GrFormNextLink } from "react-icons/gr";
import { Textarea } from "../ui/textarea";

export default function FormContact() {
  return (
    <div className="flex flex-col lg:w-3/5">
      <h1 className="lg:text-7xl text-5xl text-center lg:text-start font-medium">
        We'd love to
        <br className="hidden lg:block" /> hear from you!
      </h1>
      <p className="mt-5 opacity-80 lg:w-2/3 text-center lg:text-start">
        Whether you have a project in mind, want to collaborate, or just have a
        question, feel free to reach out. Our team is ready to help.
      </p>

      <form className="mt-10 flex flex-col space-y-5" action="">
        <Input
          style={{ fontSize: "1rem" }}
          placeholder="Enter your name"
          type="text"
          name="userName"
          id="userName"
          className="rounded-full py-6 font-medium"
        />
        <Input
          style={{ fontSize: "1rem" }}
          placeholder="Enter your email"
          type="email"
          name="userEmail"
          id="userEmail"
          className="rounded-full py-6 font-medium"
        />
        <Textarea
          style={{ fontSize: "1rem" }}
          placeholder="Enter your message"
          name="userName"
          id="userName"
          maxLength={500}
          className="rounded-xl py-6 font-medium resize-none h-60"
        />
        <Button
          className="cursor-pointer rounded-full sm:w-fit"
          type="submit"
          variant={"default"}
        >
          Submit <GrFormNextLink className="-rotate-45" />
        </Button>
      </form>
    </div>
  );
}
