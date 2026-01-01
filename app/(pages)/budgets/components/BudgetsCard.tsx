"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Budget } from "../types/budgetsTypes";
import { Transaction } from "../../transactions/types/transactionTypes";
import { Button } from "@/components/ui/button";
import { Ellipsis, ExternalLink, OctagonAlert } from "lucide-react";
import { useState, useTransition } from "react";
import Link from "next/link";
import { deleteBudgetAction } from "../actions/deleteBudgetAction";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TRANSACTION_CATEGORY } from "../../transactions/constants/transactionCategory";
import { Input } from "@/components/ui/input";
import { POT_THEMES } from "../../pots/constants/potThemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { editBudgetFormSchema } from "../schema/validationSchemas";
import z from "zod";
import { editBudgetAction } from "../actions/editBudgetAction";
export default function BudgetsCard({
  budget,
  transactions,
}: {
  budget: Budget;
  transactions: Transaction[];
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const editBudgetform = useForm<z.infer<typeof editBudgetFormSchema>>({
    resolver: zodResolver(editBudgetFormSchema),
    defaultValues: {
      category: budget.category,
      spend: budget.spend,
      theme: budget.theme,
    },
  });

  function onSubmit(data: z.infer<typeof editBudgetFormSchema>) {
    startTransition(async () => {
      try {
        const result = await editBudgetAction(budget._id, data);
        if (result.success) {
          setIsEditOpen(false);
          toast.success(`Budget edited.`);
        }
      } catch (err) {
        console.error(err);
        toast.error(`Something went wrong. Please try again later.`);
      }
    });
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle
          className={`${
            budget.spend -
              Math.abs(
                transactions
                  .filter((t) => t.transactionCategory === budget.category)
                  .reduce((sum, t) => sum + Number(t.transactionAmount), 0)
              ) <
            0
              ? "text-red-500"
              : ""
          } flex items-center gap-2`}
        >
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: budget.theme }}
          />
          {budget.category}{" "}
          {budget.spend -
            Math.abs(
              transactions
                .filter((t) => t.transactionCategory === budget.category)
                .reduce((sum, t) => sum + Number(t.transactionAmount), 0)
            ) <
          0 ? (
            <Tooltip>
              <TooltipTrigger>
                <OctagonAlert className="text-red-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>You reached the limit.</p>
              </TooltipContent>
            </Tooltip>
          ) : null}
        </CardTitle>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} className="cursor-pointer">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => setIsEditOpen(true)}
                className="cursor-pointer"
                variant="default"
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setIsDeleteOpen(true)}
                className="cursor-pointer"
                variant="destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
      <CardContent>
        <h3
          className={` mb-2 ${
            budget.spend -
              Math.abs(
                transactions
                  .filter((t) => t.transactionCategory === budget.category)
                  .reduce((sum, t) => sum + Number(t.transactionAmount), 0)
              ) <
            0
              ? "text-red-500"
              : "text-muted-foreground"
          }`}
        >
          Maximum of ${budget.spend.toFixed(2)}
        </h3>
        <div className="bg-accent w-full h-8 rounded-sm flex items-center px-1 mb-2">
          <div
            style={{
              backgroundColor:
                budget.spend -
                  Math.abs(
                    transactions
                      .filter((t) => t.transactionCategory === budget.category)
                      .reduce((sum, t) => sum + Number(t.transactionAmount), 0)
                  ) <
                0
                  ? "red"
                  : budget.theme,
              width: `${
                (Math.abs(
                  transactions
                    .filter((t) => t.transactionCategory === budget.category)
                    .reduce((sum, t) => sum + Number(t.transactionAmount), 0)
                ) *
                  100) /
                budget.spend
              }%`,
            }}
            className="h-6 duration-200 rounded-sm"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 md:w-1/2 p-2 hover:bg-accent duration-200 rounded">
            <div
              className="h-10 w-1 rounded"
              style={{
                backgroundColor:
                  budget.spend -
                    Math.abs(
                      transactions
                        .filter(
                          (t) => t.transactionCategory === budget.category
                        )
                        .reduce(
                          (sum, t) => sum + Number(t.transactionAmount),
                          0
                        )
                    ) <
                  0
                    ? "red"
                    : budget.theme,
              }}
            />
            <div className=" gap-2">
              <h6
                className={`text-sm  ${
                  budget.spend -
                    Math.abs(
                      transactions
                        .filter(
                          (t) => t.transactionCategory === budget.category
                        )
                        .reduce(
                          (sum, t) => sum + Number(t.transactionAmount),
                          0
                        )
                    ) <
                  0
                    ? "text-red-500"
                    : "text-muted-foreground"
                }`}
              >
                Spent
              </h6>
              <h2
                className={`font-semibold ${
                  budget.spend -
                    Math.abs(
                      transactions
                        .filter(
                          (t) => t.transactionCategory === budget.category
                        )
                        .reduce(
                          (sum, t) => sum + Number(t.transactionAmount),
                          0
                        )
                    ) <
                  0
                    ? "text-red-500"
                    : ""
                }`}
              >
                $
                {Math.abs(
                  transactions
                    .filter((t) => t.transactionCategory === budget.category)
                    .reduce((sum, t) => sum + Number(t.transactionAmount), 0)
                ).toFixed(2)}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-4 md:w-1/2 p-2 hover:bg-accent duration-200 rounded">
            <div
              className="h-10 w-1 rounded opacity-30"
              style={{
                backgroundColor:
                  budget.spend -
                    Math.abs(
                      transactions
                        .filter(
                          (t) => t.transactionCategory === budget.category
                        )
                        .reduce(
                          (sum, t) => sum + Number(t.transactionAmount),
                          0
                        )
                    ) <
                  0
                    ? "red"
                    : budget.theme,
              }}
            />
            <div className="">
              <h6
                className={`text-sm text-muted-foreground flex items-center gap-1 ${
                  budget.spend -
                    Math.abs(
                      transactions
                        .filter(
                          (t) => t.transactionCategory === budget.category
                        )
                        .reduce(
                          (sum, t) => sum + Number(t.transactionAmount),
                          0
                        )
                    ) <
                  0
                    ? "text-red-500"
                    : ""
                }`}
              >
                Free
              </h6>
              <h2
                className={`font-semibold ${
                  budget.spend -
                    Math.abs(
                      transactions
                        .filter(
                          (t) => t.transactionCategory === budget.category
                        )
                        .reduce(
                          (sum, t) => sum + Number(t.transactionAmount),
                          0
                        )
                    ) <
                  0
                    ? "text-red-500"
                    : ""
                }`}
              >
                {budget.spend -
                  Math.abs(
                    transactions
                      .filter((t) => t.transactionCategory === budget.category)
                      .reduce((sum, t) => sum + Number(t.transactionAmount), 0)
                  ) <
                0
                  ? "-"
                  : ""}
                $
                {Math.abs(
                  budget.spend -
                    Math.abs(
                      transactions
                        .filter(
                          (t) => t.transactionCategory === budget.category
                        )
                        .reduce(
                          (sum, t) => sum + Number(t.transactionAmount),
                          0
                        )
                    )
                ).toFixed(2)}
              </h2>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {transactions.filter((t) => {
          return t.transactionCategory === budget.category;
        }).length === 0 ? null : (
          <>
            <div className="bg-accent opacity-80 p-2 rounded w-full">
              <div className="flex items-center justify-between mb-2">
                <h1 className="font-semibold">Latest spending</h1>
                <Link
                  className="flex items-center hover:underline text-muted-foreground text-sm gap-1"
                  href={`/transactions`}
                >
                  See all <ExternalLink size={16} />
                </Link>
              </div>
              <div>
                {transactions
                  .filter((t) => {
                    return t.transactionCategory === budget.category;
                  })
                  .map((t) => (
                    <div
                      key={t._id}
                      className="flex items-center justify-between mt-4 hover:bg-card duration-200 rounded px-2 py-1"
                    >
                      <h1>{t.transactionName}</h1>
                      <div className="flex flex-col items-center">
                        <h2
                          className={`${
                            t.transactionAmount > 0
                              ? "text-green-700"
                              : "text-red-600"
                          } font-bold`}
                        >
                          {/* {t.transactionAmount > 0 ? "+" : "-"}$ */}$
                          {Math.abs(t.transactionAmount).toFixed(2)}
                        </h2>
                        <h6 className="text-muted-foreground text-[10px]">
                          {t.transactionDate.slice(0, 10)}
                        </h6>
                      </div>
                    </div>
                  ))
                  .slice(0, 3)}
              </div>
            </div>
          </>
        )}
      </CardFooter>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {budget.category}?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this budget? This action cannot be
              reversed, and all the data inside it will be removed forever.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2 justify-end">
            <Button
              onClick={() => {
                startTransition(async () => {
                  try {
                    const result = await deleteBudgetAction(budget._id);
                    if (result.success) {
                      setIsDeleteOpen(false);
                      toast.success(`${budget.category} deleted!`);
                    }
                  } catch (err) {
                    console.error(err);
                    toast.error(
                      `Something went wrong. please try again later!`
                    );
                  }
                });
              }}
              disabled={isPending}
              className="cursor-pointer"
              variant={"destructive"}
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
            <DialogTitle>Edit {budget.category}?</DialogTitle>
            <DialogDescription>
              As your budgets change, feel free to update your spending limits.
            </DialogDescription>
          </DialogHeader>
          <form
            id="editBudgetform"
            onSubmit={editBudgetform.handleSubmit(onSubmit)}
          >
            <FieldGroup>
              <Controller
                name="category"
                control={editBudgetform.control}
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
                control={editBudgetform.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Maximum Spend</FieldLabel>
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
                control={editBudgetform.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="vertical"
                    data-invalid={fieldState.invalid}
                    className=""
                  >
                    <FieldLabel htmlFor="theme">Theme</FieldLabel>
                    <FieldContent>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="theme"
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
          <Button
            disabled={isPending}
            form="editBudgetform"
            className="cursor-pointer"
          >
            {isPending ? <Spinner /> : "Submit"}
          </Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
