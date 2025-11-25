"use client";

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
  userEmail: z
    .email("Must be email")
    .min(9, "Email must be at least 9 characters.")
    .max(70, "Email must be at most 70 characters."),
  userPassword: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(30, "Password must be at most 30 characters."),
});

export function SignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userEmail: "",
      userPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    // console.log(data);
    form.reset();
  }

  return (
    <Card className="w-full mx-5 lg:m-0 sm:max-w-md">
      <CardHeader>
        <CardTitle>Sign in to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="sign-up-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4">
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
                    placeholder="john@gmail.com"
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
                    placeholder="john123"
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
            Sign in
          </Button>
        </Field>
      </CardFooter>
      <div className="w-9/10 mx-auto h-0.5 opacity-10 bg-white rounded-full" />
      <GitHubGoogle />
      <span className="px-6 opacity-90">
        Create account{" "}
        <Link
          className="text-blue-600 hover:underline opacity-100"
          href={`/sign-up`}
        >
          here!{" "}
        </Link>
      </span>
    </Card>
  );
}
