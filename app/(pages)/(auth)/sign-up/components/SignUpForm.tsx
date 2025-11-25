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
import { onSubmit } from "../actions/handleAction";
import { formSchema } from "../schema/formSchema";
import { toast, Toaster } from "sonner";
import { useTransition } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      userEmail: "",
      userPassword: "",
    },
  });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <Card className="w-full mx-5 lg:m-0 sm:max-w-md">
      <CardHeader>
        <CardTitle>Create an acount</CardTitle>
        <CardDescription>
          Enter your email below to create your account{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="sign-up-form"
          onSubmit={form.handleSubmit((data) => {
            startTransition(async () => {
              try {
                const result = await onSubmit(data);

                if (!result.success || !result) {
                  toast.error(result?.message ?? "Something went wrong");
                  return;
                }

                toast.success("Account created!");
                router.push("/home")
              } catch (err) {
                toast.error("Something went wrong: " + err);
              }
            });
          })}
        >
          <FieldGroup className="gap-4">
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
                    placeholder="john"
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
          <Button
            className="cursor-pointer"
            disabled={isPending}
            type="submit"
            form="sign-up-form"
          >
            {isPending ? <Spinner /> : "Create account"}
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
