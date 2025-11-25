// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { handleSignUp } from "../actions/handleSignUp";

// export default function Credentials() {
//   return (
//     <form action={handleSignUp} className="flex flex-col gap-3">
// <Label htmlFor="userName">Your name</Label>
// <Input
//   className="text-lg font-medium py-5"
//   type="text"
//   placeholder="John"
//   name="userName"
//   id="userName"
// />
// <Label htmlFor="userEmail">Your email address </Label>
// <Input
//   className="text-lg font-medium py-5"
//   type="email"
//   placeholder="john@gmail.com"
//   name="userEmail"
//   id="userEmail"
// />
// <Label htmlFor="userPassword">Your password </Label>
// <Input
//   className="text-lg font-medium py-5"
//   type="password"
//   placeholder="john1234"
//   name="userPassword"
//   id="userPassword"
// />
// <Button className="cursor-pointer w-fit self-end mt-2" type="submit">
//   Create acount
// </Button>
//     </form>
//   );
// }

"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import GitHubGoogle from "./GitHubGoogle";
import Link from "next/link";

const formSchema = z.object({
  userName: z
    .string()
    .min(5, "User name title must be at least 5 characters.")
    .max(32, "User name title must be at most 32 characters."),
  userEmail: z
    .email("Must be email")
    .min(9, "Email must be at least 9 characters.")
    .max(70, "Email must be at most 70 characters."),
  userPassword: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(30, "Password must be at most 30 characters."),
});

export function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      userEmail: "",
      userPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    form.reset();
  }

  return (
    <Card className="w-full mx-5 lg:m-0 sm:max-w-md">
      <CardHeader>
        <CardTitle>Create an acount</CardTitle>
        <CardDescription>
          Enter your email below to create your account{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="sign-up-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="userName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sign-up-form-userName">
                    User name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="sign-up-form-userName"
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                    className="py-5"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="userEmail"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sign-up-form-userEmail">
                    User email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="sign-up-form-userEmail"
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                    className="py-5"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="userPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sign-up-form-userPassword">
                    User password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="sign-up-form-userPassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                    className="py-5"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            className="cursor-pointer"
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button className="cursor-pointer" type="submit" form="sign-up-form">
            Submit
          </Button>
        </Field>
      </CardFooter>
      <div className="w-9/10 mx-auto h-0.5 opacity-10 bg-white rounded-full" />
      <GitHubGoogle />
      <span className="px-6 opacity-90">
        Already have an account?{" "}
        <Link
          className="text-blue-600 hover:underline opacity-100"
          href={`/sign-in`}
        >
          Sign in
        </Link>
      </span>
    </Card>
  );
}
