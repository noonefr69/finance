"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { formSchema } from "../schema/validationSchemas";
import z from "zod";
import { format } from "date-fns";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Calendar } from "@/components/ui/calendar";
import { useState, useTransition } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TRANSACTION_CATEGORY } from "../constants/transactionCategory";
import { createTransactionAction } from "../actions/createTransactionAction";
import { Spinner } from "@/components/ui/spinner";
import { Checkbox } from "@/components/ui/checkbox";

export default function NewTransactionForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transactionName: "",
      transactionDate: "",
      transactionCategory: "",
      transactionAmount: undefined as unknown as number,
      transactionRecurring: false,
    },
  });

  function createTransaction(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        await createTransactionAction(data);
      } catch (error) {
        console.log(error);
      }
    });
  }
  return (
    <form id="transaction-form" onSubmit={form.handleSubmit(createTransaction)}>
      <FieldGroup>
        <Controller
          name="transactionName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="transaction-name">Name</FieldLabel>
              <Input
                {...field}
                id="transaction-name"
                aria-invalid={fieldState.invalid}
                placeholder="e.g. Urban hub"
                autoComplete="off"
                maxLength={30}
              />
              <span className="text-right">
                {30 - field.value.length} chracters left.
              </span>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="transactionDate"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!field.value}
                    className="w-[280px] justify-start cursor-pointer text-left"
                  >
                    <CalendarIcon />
                    {field.value ? (
                      format(new Date(field.value), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date?.toISOString())}
                  />
                </PopoverContent>
              </Popover>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="transactionCategory"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="vertical" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-transaction-category">
                Category
              </FieldLabel>
              <FieldContent>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="form-rhf-transaction-category"
                    aria-invalid={fieldState.invalid}
                    className="w-full cursor-pointer"
                  >
                    <SelectValue
                      placeholder={field.value || "Select a category"}
                    />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    <SelectItem className="cursor-pointer" value="auto">
                      Auto
                    </SelectItem>
                    <SelectSeparator />
                    {TRANSACTION_CATEGORY.map((theme) => (
                      <SelectItem
                        className="cursor-pointer"
                        key={theme}
                        value={theme}
                      >
                        {theme}
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
        <Controller
          name="transactionAmount"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`transaction-amount`}>Amount</FieldLabel>
              <Input
                {...field}
                type="number"
                value={field.value ?? ""}
                onChange={(e) => {
                  const raw = e.target.value;
                  field.onChange(raw === "" ? null : Number(raw));
                }}
                id={`transaction-amount`}
                aria-invalid={fieldState.invalid}
                placeholder="Enter amount"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="transactionRecurring"
          control={form.control}
          render={({ field, fieldState }) => (
            <FieldSet data-invalid={fieldState.invalid}>
              <FieldGroup data-slot="checkbox-group">
                <Field orientation="horizontal" className="w-fit">
                  <Checkbox
                    id="form-rhf-checkbox-responses"
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="cursor-pointer"
                  />
                  <FieldLabel
                    htmlFor="form-rhf-checkbox-responses"
                    className="font-normal cursor-pointer"
                  >
                    Recurring
                  </FieldLabel>
                </Field>
              </FieldGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldSet>
          )}
        />
      </FieldGroup>
      <Button
        disabled={isPending}
        type="submit"
        className="w-full mt-5 cursor-pointer"
      >
        {isPending ? <Spinner /> : "Submit"}
      </Button>
    </form>
  );
}
