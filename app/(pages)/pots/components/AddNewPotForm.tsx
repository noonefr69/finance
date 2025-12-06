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
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { newPotAction } from "../actions/newPotAction";
import { useTransition } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// schema
const formSchema = z.object({
  potName: z
    .string()
    .min(3, "Pot name must be at least 3 characters.")
    .max(30, "Pot name must be at most 30 characters."),
  potAmount: z
    .number("Must be Number")
    .min(1, "Amount must be at least 1.")
    .max(1000000, "Amount must be most 1,000,000."),
  potTheme: z
    .string()
    .min(1, "Please select your theme.")
    .refine((val) => val !== "auto", {
      message: "Auto-detection is not allowed. Please select a specific theme.",
    }),
});

export default function AddNewPotForm() {
  const [isPending, startTransition] = useTransition();

  // form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      potName: "",
      potAmount: 0,
      potTheme: "",
    },
  });

  // onSubmit
  function onSubmit(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const res = await newPotAction(data);
        if (res.success) {
          form.reset();
          toast.success(res.message ?? "Pot created!");
        } else {
          toast.error("Failed to create pot.");
        }
      } catch (error) {
        toast.error("Unexpected error!");
      }
    });
  }

  // themes
  const themes = [
    { label: "Red" },
    { label: "Blue" },
    { label: "Green" },
    { label: "Yellow" },
    { label: "Purple" },
    { label: "Pink" },
    { label: "Gray" },
  ] as const;

  return (
    <Card className="bg-transparent outline-0 border-0 p-0 shadow-none">
      {/* Header */}
      <CardHeader className="p-0">
        <CardTitle>Add New Pot</CardTitle>
        <CardDescription>
          Choose a category to set a spending budget. These categories can help
          you monitor spending.{" "}
        </CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-0">
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="potName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-potName">Name</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-potName"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Rainy Days"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="potAmount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-potAmount">
                    Amount
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-potAmount"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. 2000$"
                    autoComplete="off"
                    value={field.value ?? ""}
                    type="number"
                    min={1}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    onFocus={() => {
                      if (field.value === 0) field.onChange("");
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="potTheme"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field orientation="vertical" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-potTheme">Theme</FieldLabel>
                  <FieldContent>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="form-rhf-potTheme"
                        aria-invalid={fieldState.invalid}
                        className="w-full cursor-pointer"
                      >
                        <SelectValue
                          placeholder={field.value || "Select a theme"}
                        />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        <SelectItem className="cursor-pointer" value="auto">
                          Auto
                        </SelectItem>
                        <SelectSeparator />
                        {themes.map((theme) => (
                          <SelectItem
                            className="cursor-pointer"
                            key={theme.label}
                            value={theme.label}
                          >
                            <span
                              style={{ backgroundColor: theme.label }}
                              className={`h-3 w-3 rounded-full`}
                            ></span>
                            {theme.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-0">
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
            disabled={isPending}
            className="cursor-pointer transition-all duration-200"
            type="submit"
            form="form-rhf-demo"
          >
            {isPending ? <Spinner /> : "Submit"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
