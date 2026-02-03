"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { GrFormNextLink } from "react-icons/gr";
import { Textarea } from "../ui/textarea";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group";
import { useTransition } from "react";
import { toast } from "sonner";
import { newContact } from "./newContact";
import { Spinner } from "../ui/spinner";

export default function FormContact() {
  const [isPending, startTransition] = useTransition();

  const formSchema = z.object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters.")
      .max(32, "Name must be at most 32 characters."),
    email: z
      .string()
      .email("Please enter a valid email address.")
      .min(5, "Email must be at least 5 characters.")
      .max(100, "Email must be at most 100 characters."),
    description: z
      .string()
      .min(5, "Description must be at least 5 characters.")
      .max(100, "Description must be at most 100 characters."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      description: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const result = await newContact(data);

        if (result.success) {
          toast.success(`New contact created.`);
          form.reset();
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong!");
      }
    });
  }
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

      <form
        id="contact-form"
        className="mt-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-title">Name</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="e.g. Jack"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-email">Email</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="e.g. jack@gmail.com"
                  autoComplete="off"
                  type="email"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-description">
                  Description
                </FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id="form-rhf-demo-description"
                    placeholder="write usefull things."
                    rows={6}
                    className="min-h-24 resize-none"
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.value.length}/100 characters
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Button
          disabled={isPending}
          className="mt-4 cursor-pointer"
          type="submit"
          form="contact-form"
        >
          {isPending ? <Spinner /> : "Submit"}
        </Button>
      </form>
    </div>
  );
}
