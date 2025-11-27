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
import Link from "next/link";
import { signInAction } from "../actions/signInAction";
import { toast } from "sonner";
import { useTransition } from "react";
import ProviderLoginWay from "../../components/ProviderLoginWay";
import { Github, User } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { formSchema } from "../schema/formSchema";

export function SignInForm() {
  const [isPending, startTransition] = useTransition();
  // schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userEmail: "",
      userPassword: "",
    },
  });

  // action
  function onSubmit(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const result = await signInAction(data);

        if (result?.success === false) {
          toast.error(result.message);
        }
      } catch (err) {
        toast.error("Something went wrong");
      }
    });
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
                    Email
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
                    Password
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
            {isPending ? <Spinner /> : "Sign in"}
          </Button>
        </Field>
      </CardFooter>
      <div className="w-9/10 mx-auto h-0.5 opacity-10 bg-white rounded-full" />
      <div className="flex items-center gap-4 px-6 justify-between">
        <ProviderLoginWay
          icon={<Github />}
          label="Sign in with GitHub"
          way={"github"}
        />
        <ProviderLoginWay
          icon={<User />}
          label="Sign in with Google"
          way={"google"}
        />
      </div>
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
