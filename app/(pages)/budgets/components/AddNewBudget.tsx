"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { TRANSACTION_CATEGORY } from "../../transactions/constants/transactionCategory";
import { POT_THEMES } from "../../pots/constants/potThemes";
import { newBudgetFormSchema } from "../schema/validationSchemas";
import { Spinner } from "@/components/ui/spinner";
import { createBudgetAction } from "../actions/createBudgetAction";
import { toast } from "sonner";

export default function AddNewBudget() {
  const [isNewBudgetOpen, setIsNewBudgetOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const newBudgetform = useForm<z.infer<typeof newBudgetFormSchema>>({
    resolver: zodResolver(newBudgetFormSchema),
    defaultValues: {
      category: "",
      spend: undefined as unknown as number,
      theme: "",
    },
  });

  function onSubmit(data: z.infer<typeof newBudgetFormSchema>) {
    startTransition(async () => {
      try {
        const result = await createBudgetAction(data);
        if (result.success) {
          setIsNewBudgetOpen(false);
          toast.success("Budget created!");
        }
        newBudgetform.reset();
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong. Please try again later!");
      }
    });
  }
  return (
    <>
      <Button
        onClick={() => setIsNewBudgetOpen(true)}
        className="cursor-pointer"
      >
        New budget
      </Button>
      <Dialog open={isNewBudgetOpen} onOpenChange={setIsNewBudgetOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Budget</DialogTitle>
            <DialogDescription>
              Choose a category to set a spending budget. These categories can
              help you monitor spending.
            </DialogDescription>
            <form
              id="newBudgetform"
              onSubmit={newBudgetform.handleSubmit(onSubmit)}
            >
              <FieldGroup>
                <Controller
                  name="category"
                  control={newBudgetform.control}
                  render={({ field, fieldState }) => (
                    <Field
                      orientation="vertical"
                      data-invalid={fieldState.invalid}
                      className="mt-2"
                    >
                      <FieldLabel htmlFor="category">Category</FieldLabel>
                      <FieldContent>
                        <Select
                          name={field.name}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="category"
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
                  name="spend"
                  control={newBudgetform.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Maximum Spend
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. $2000"
                        type="number"
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            value === "" ? undefined : Number(value)
                          );
                        }}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="theme"
                  control={newBudgetform.control}
                  render={({ field, fieldState }) => (
                    <Field
                      orientation="vertical"
                      data-invalid={fieldState.invalid}
                      className=""
                    >
                      <FieldLabel htmlFor="category">Theme</FieldLabel>
                      <FieldContent>
                        <Select
                          name={field.name}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="category"
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
                            {POT_THEMES.map((theme) => (
                              <SelectItem
                                className="cursor-pointer"
                                key={theme}
                                value={theme}
                              >
                                <div
                                  className="h-3 w-3 rounded-full"
                                  style={{ backgroundColor: theme }}
                                />
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
              </FieldGroup>
            </form>
            <DialogFooter>
              <Button
                disabled={isPending}
                form="newBudgetform"
                className="w-full cursor-pointer mt-4"
              >
                {isPending ? <Spinner /> : "Submit"}
              </Button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
