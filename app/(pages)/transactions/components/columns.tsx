"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "../types/transactionTypes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MoreHorizontal } from "lucide-react";
import { deleteTransactionAction } from "../actions/deleteTransactionAction";
import { useState, useTransition } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editTransactionFormSchema } from "../schema/validationSchemas";
import z from "zod";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TRANSACTION_CATEGORY } from "../constants/transactionCategory";
import { Checkbox } from "@/components/ui/checkbox";
import { editTransactionAction } from "../actions/editTransactionAction";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "transactionName",
    header: "Recipient / Sender",
  },
  {
    accessorKey: "transactionCategory",
    header: "Category",
  },
  {
    accessorKey: "transactionDate",
    header: "Transaction Date",
    cell: ({ row }) => {
      return <span>{row.original.transactionDate.slice(0, 10)}</span>;
    },
  },
  {
    accessorKey: "transactionAmount",
    header: "Amount",
    cell: ({ row }) => {
      return (
        <span
          className={`${
            row.original.transactionAmount > 0
              ? "text-green-700"
              : "text-red-500"
          } font-semibold`}
        >
          ${Math.abs(row.original.transactionAmount).toFixed(2)}
        </span>
      );
    },
  },
  {
    id: "actions",
    // header: () => <div className="flex justify-end">Actions</div>,
    cell: ({ row }) => {
      const [isDeleteOpen, setIsDeleteOpen] = useState(false);
      const [isEditOpen, setIsEditOpen] = useState(false);
      const [isPending, startTransition] = useTransition();

      const form = useForm<z.infer<typeof editTransactionFormSchema>>({
        resolver: zodResolver(editTransactionFormSchema),
        defaultValues: {
          transactionName: row.original.transactionName,
          transactionDate: row.original.transactionDate,
          transactionCategory: row.original.transactionCategory,
          transactionAmount: row.original.transactionAmount,
          transactionRecurring: row.original.transactionRecurring,
        },
      });

      function editTransactionForm(
        data: z.infer<typeof editTransactionFormSchema>
      ) {
        startTransition(async () => {
          try {
            const result = await editTransactionAction(row.original._id, data);
            if (result.success) {
              setIsEditOpen(false);
              toast.success(`Transaction updated.`);
            }
          } catch (error) {
            console.log(error);
            toast.error(`Something went wrong. Please try again later`);
          }
        });
      }

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="space-y-1" align="end">
              <DropdownMenuItem
                className="w-full cursor-pointer"
                variant={"default"}
                onClick={() => setIsEditOpen(true)}
              >
                Edit
              </DropdownMenuItem>

              <Separator />

              <DropdownMenuItem
                onClick={() => setIsDeleteOpen(true)}
                className="w-full cursor-pointer"
                variant={"destructive"}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>

            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Delete ‘{row.original.transactionName}’?
                  </DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this transaction? This
                    action cannot be reversed, and all the data inside it will
                    be removed forever.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-x-1.5 text-end">
                  <Button
                    onClick={() => {
                      startTransition(async () => {
                        try {
                          const result = await deleteTransactionAction(
                            row.original._id
                          );

                          if (result.success) {
                            setIsDeleteOpen(false);
                            toast.success(
                              `${row.original.transactionName} deleted.`
                            );
                          }
                        } catch (err) {
                          console.error(err);

                          toast.error(
                            `Something went wrong. Please try again later.`
                          );
                        }
                      });
                    }}
                    className="cursor-pointer"
                    variant={"destructive"}
                    disabled={isPending}
                  >
                    {isPending ? <Spinner /> : "Yes, confirm deletion."}
                  </Button>
                  <Button
                    onClick={() => setIsDeleteOpen(false)}
                    className="cursor-pointer"
                    variant={"outline"}
                  >
                    Close
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Edit ‘{row.original.transactionName}’?
                  </DialogTitle>
                  <DialogDescription>
                    Update the details of this transaction. Changes will be
                    saved immediately.
                  </DialogDescription>
                </DialogHeader>

                <form
                  id="transaction-form"
                  onSubmit={form.handleSubmit(editTransactionForm)}
                >
                  <FieldGroup>
                    <Controller
                      name="transactionName"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="transaction-name">
                            Name
                          </FieldLabel>
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
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
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
                                selected={
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
                                }
                                onSelect={(date) =>
                                  field.onChange(date?.toISOString())
                                }
                              />
                            </PopoverContent>
                          </Popover>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="transactionCategory"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          orientation="vertical"
                          data-invalid={fieldState.invalid}
                        >
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
                                  placeholder={
                                    field.value || "Select a category"
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent position="item-aligned">
                                <SelectItem
                                  className="cursor-pointer"
                                  value="auto"
                                >
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
                          <FieldLabel htmlFor={`transaction-amount`}>
                            Amount
                          </FieldLabel>
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
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
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
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
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
              </DialogContent>
            </Dialog>
          </DropdownMenu>
        </div>
      );
    },
  },
];
