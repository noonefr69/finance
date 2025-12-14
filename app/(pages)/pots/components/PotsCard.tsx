"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { Pot } from "../types/potTypes";
import { deletePotAction } from "../actions/deletePotAction";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import z, { unknown } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { editPotAction } from "../actions/editPotAction";
import { addMoneyAction } from "../actions/addMoneyAction";
import { withdrawMoneyAction } from "../actions/withdrawMoneyAction";

export default function PotsCard({ pot }: { pot: Pot }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [potAmountValCl, setPotAmountValCl] = useState("");
  const [potAmountValSecCl, setPotAmountValSecCl] = useState("");

  const editFormSchema = z.object({
    potName: z
      .string("Pot name is required")
      .min(3, "Pot name must be at least 3 characters.")
      .max(30, "Pot name must be at most 30 characters."),
    potAmount: z
      .number("Must be a number")
      .min(1, "Must be at least 1 dollar.")
      .max(10000, "Must be at most 10,000 dollars."),
    potTheme: z
      .string()
      .min(1, "Please select your theme.")
      .refine((val) => val !== "auto", {
        message:
          "Auto-detection is not allowed. Please select a specific theme.",
      }),
  });

  const addMoneySchema = z.object({
    potAmountValue: z
      .number("Must be a number")
      .min(1, "You can add money  at least 1 dollar.")
      .max(
        pot.potAmount - pot.potAmountValue,
        `You can add money at most $${
          pot.potAmount - pot.potAmountValue
        } dollars.`
      ),
  });

  const withdrawMoneySchema = z.object({
    potAmountValue: z
      .number("Must be a number")
      .min(1, "Withdraw must be at least 1 dollar.")
      .max(
        pot.potAmountValue,
        `You can withdraw at most $${pot.potAmountValue}.`
      ),
  });

  const editForm = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      potName: pot.potName,
      potAmount: pot.potAmount,
      potTheme: pot.potTheme,
    },
  });

  const addMoneyForm = useForm<z.infer<typeof addMoneySchema>>({
    resolver: zodResolver(addMoneySchema),
    defaultValues: {
      potAmountValue: undefined as unknown as number,
    },
  });

  const withdrawMoneyForm = useForm<z.infer<typeof withdrawMoneySchema>>({
    resolver: zodResolver(withdrawMoneySchema),
    defaultValues: {
      potAmountValue: undefined as unknown as number,
    },
  });

  async function handleDelete(potId: string) {
    startTransition(async () => {
      try {
        const result = await deletePotAction(potId);

        if (!result?.success) {
          return;
        }

        setIsDeleteOpen(false);
        toast.success(`${pot.potName} deleted!`);
      } catch (error) {
        console.error("Something went wrong. Please try later.");
      }
    });
  }

  function handleEdit(data: z.infer<typeof editFormSchema>) {
    startTransition(async () => {
      try {
        const result = await editPotAction(pot._id, data);

        if (!result.success) {
          return;
        }

        setIsEditOpen(false);
        toast.success(`Pot edited.`);
      } catch (err) {
        console.error(err);

        toast.error("Something went wrong. Please try later.");
      }
    });
  }

  function handleAddMoney(data: z.infer<typeof addMoneySchema>) {
    startTransition(async () => {
      try {
        const result = await addMoneyAction(pot._id, data);
        if (!result.success) {
          return;
        }

        setIsAddMoneyOpen(false);
        toast.success(`Money added.`);
      } catch (err) {
        console.error(err);

        toast.error("Something went wrong. Please try later.");
      }
    });
  }

  function handleWithdrawMoney(data: z.infer<typeof withdrawMoneySchema>) {
    startTransition(async () => {
      try {
        const result = await withdrawMoneyAction(pot._id, data);
        if (!result.success) {
          return;
        }

        setIsWithdrawOpen(false);
        toast.success(`Withdraw succesull.`);
      } catch (err) {
        console.error(err);

        toast.error("Something went wrong. Please try later.");
      }
    });
  }

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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: pot.potTheme }}
          />
          {pot.potName}
        </CardTitle>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"ghost"}
                className="cursor-pointer p-1 w-3 h-6 rounded-full"
              >
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={(e) => {
                  e.preventDefault();
                  setIsEditOpen(true);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                className="cursor-pointer"
                onSelect={(e) => {
                  e.preventDefault();
                  setIsDeleteOpen(true);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-5">
          <h5 className="text-lg font-semibold ">Total Saved</h5>
          <h1 className="md:text-4xl font-semibold">
            ${pot.potAmountValue.toFixed(2)}
          </h1>
        </div>
        <div className="w-full overflow-hidden h-2 bg-accent rounded-2xl">
          <div
            className={`h-2 duration-200 transition-all`}
            style={{
              backgroundColor: pot.potTheme,
              width: `${(100 * pot.potAmountValue) / pot.potAmount}%`,
            }}
          ></div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <h6 className="text-muted-foreground font-semibold">{`${(
            (100 * pot.potAmountValue) /
            pot.potAmount
          ).toFixed(2)}%`}</h6>
          <span className="text-muted-foreground font-semibold">
            Target of ${pot.potAmount.toFixed(2)}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between mt-2 gap-4">
        <Button
          onClick={() => setIsAddMoneyOpen(true)}
          variant={"secondary"}
          className="cursor-pointer w-full shrink py-7"
        >
          Add money
        </Button>
        <Button
          onClick={() => setIsWithdrawOpen(true)}
          variant={"secondary"}
          className="cursor-pointer w-full shrink py-7"
        >
          Withdraw
        </Button>
      </CardFooter>

      {/* Edit dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit ‘{pot.potName}’</DialogTitle>
            <DialogDescription>
              If your saving targets change, feel free to update your pots.
            </DialogDescription>
            <form
              id={`form-edit-${pot._id}`}
              className="md:mt-5"
              onSubmit={editForm.handleSubmit(handleEdit)}
            >
              <FieldGroup>
                <Controller
                  name="potName"
                  control={editForm.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`potName-${pot._id}`}>
                        Name
                      </FieldLabel>
                      <Input
                        id={`potName-${pot._id}`}
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        placeholder="e.g. Rainy Days"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="potAmount"
                  control={editForm.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`potAmount-${pot._id}`}>
                        Amount
                      </FieldLabel>
                      <Input
                        id={`potAmount-${pot._id}`}
                        type="number"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const raw = e.target.value;
                          field.onChange(raw === "" ? null : Number(raw));
                        }}
                        placeholder="e.g. $2000"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="potTheme"
                  control={editForm.control}
                  render={({ field, fieldState }) => (
                    <Field
                      orientation="vertical"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel htmlFor={`potTheme-${pot._id}`}>
                        Theme
                      </FieldLabel>
                      <FieldContent>
                        <Select
                          name={field.name}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id={`potTheme-${pot._id}`}
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
            <Button
              variant={"secondary"}
              className="cursor-pointer md:mt-7"
              type="submit"
              disabled={isPending}
              form={`form-edit-${pot._id}`}
            >
              {isPending ? <Spinner /> : "Submit"}
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Delete dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete ‘{pot.potName}’</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this pot? This action cannot be
              reversed, and all the data inside it will be removed forever.
            </DialogDescription>
            <div className="flex items-center gap-2 justify-end">
              <Button
                disabled={isPending}
                className="cursor-pointer lg:text-[16px] lg:py-5"
                variant={"destructive"}
                onClick={() => handleDelete(pot._id)}
              >
                {isPending ? <Spinner /> : "Yes, Confirm Deleteion."}
              </Button>
              <Button
                className="cursor-pointer lg:text-[16px] lg:py-5"
                variant={"outline"}
                onClick={() => setIsDeleteOpen(false)}
              >
                Close
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Add Moeny dialog */}
      <Dialog open={isAddMoneyOpen} onOpenChange={setIsAddMoneyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add to ‘{pot.potName}’</DialogTitle>
            <DialogDescription>
              Add money to your pot to keep it separate from your main balance.
              As soon as you add this money, it will be deducted from your
              current balance.
            </DialogDescription>
            <div>
              <div className="flex items-center justify-between my-5">
                <h5 className="text-lg font-semibold ">New Amount</h5>
                <h1 className="md:text-4xl font-semibold">
                  $
                  {(
                    Number(pot.potAmountValue) + Number(potAmountValCl)
                  ).toFixed(2)}
                </h1>
              </div>
              <div className="h-2 flex items-center overflow-hidden w-full bg-accent rounded-2xl">
                <div
                  className="h-2 duration-200 transition-all"
                  style={{
                    backgroundColor: pot.potTheme,
                    width: `${(
                      (100 * pot.potAmountValue) /
                      pot.potAmount
                    ).toFixed(2)}%`,
                  }}
                ></div>
                <div
                  className={`${
                    pot.potAmountValue == pot.potAmount ? "hidden" : "block"
                  } h-2 duration-200 transition-all`}
                  style={{
                    opacity: `40%`,
                    backgroundColor: pot.potTheme,
                    width: `${(
                      (100 * Number(potAmountValCl)) /
                      pot.potAmount
                    ).toFixed(2)}%`,
                  }}
                ></div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <h1 className="text-muted-foreground font-semibold">
                  {(
                    (100 * Number(pot.potAmountValue)) / pot.potAmount +
                    (100 * Number(potAmountValCl)) / pot.potAmount
                  ).toFixed(2)}
                  %
                </h1>
                <h1 className="text-muted-foreground font-semibold">
                  Target of ${pot.potAmount.toFixed(2)}
                </h1>
              </div>
            </div>
            <form
              id="add-money-form"
              onSubmit={addMoneyForm.handleSubmit(handleAddMoney)}
            >
              <FieldGroup>
                <Controller
                  name="potAmountValue"
                  control={addMoneyForm.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`addMoney-${pot._id}`}>
                        Amount to add
                      </FieldLabel>
                      <Input
                        {...field}
                        type="number"
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const raw = e.target.value;
                          field.onChange(raw === "" ? null : Number(raw));
                          setPotAmountValCl(e.target.value);
                        }}
                        id={`addMoney-${pot._id}`}
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
              </FieldGroup>
            </form>
            <Button
              disabled={isPending}
              className="cursor-pointer lg:text-[16px] md:py-5 mt-4"
              variant={"secondary"}
              type="submit"
              form="add-money-form"
            >
              {isPending ? <Spinner /> : "Confirm"}
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Withdraw money dialog */}
      <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw from ‘{pot.potName}’</DialogTitle>
            <DialogDescription>
              Withdraw from your pot to put money back in your main balance.
              This will reduce the amount you have in this pot.
            </DialogDescription>
            <div>
              <div className="flex items-center justify-between my-5">
                <h5 className="text-lg font-semibold ">New Amount</h5>
                <h1 className="md:text-4xl font-semibold">
                  $
                  {(
                    Number(pot.potAmountValue) - Number(potAmountValSecCl)
                  ).toFixed(2)}
                </h1>
              </div>
              <div className="h-2 flex items-center overflow-hidden w-full bg-accent rounded-2xl">
                <div
                  className="h-2 duration-200 transition-all relative"
                  style={{
                    backgroundColor: pot.potTheme,
                    width: `${(
                      (100 * pot.potAmountValue) /
                      pot.potAmount
                    )}%`,
                  }}
                >
                  <div
                    className={`${
                      pot.potAmountValue == pot.potAmount ? "hidden" : "block"
                    } h-2 duration-200 transition-all absolute right-0 top-0 `}
                    style={{
                      backgroundColor: `color-mix(in srgb, ${pot.potTheme} 50%, black)`,
                      width: `${(
                        (100 * Number(potAmountValSecCl)) /
                        pot.potAmountValue
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <h1 className="text-muted-foreground font-semibold">
                  {(
                    (100 * Number(pot.potAmountValue)) / pot.potAmount -
                    (100 * Number(potAmountValSecCl)) / pot.potAmount
                  ).toFixed(2)}
                  %
                </h1>
                <h1 className="text-muted-foreground font-semibold">
                  Target of ${pot.potAmount.toFixed(2)}
                </h1>
              </div>
            </div>
            <form
              id="withdraw-money-form"
              onSubmit={withdrawMoneyForm.handleSubmit(handleWithdrawMoney)}
            >
              <FieldGroup>
                <Controller
                  name="potAmountValue"
                  control={withdrawMoneyForm.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`withdraw-${pot._id}`}>
                        Amount to withdraw
                      </FieldLabel>
                      <Input
                        {...field}
                        type="number"
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const raw = e.target.value;
                          field.onChange(raw === "" ? null : Number(raw));
                          setPotAmountValSecCl(e.target.value);
                        }}
                        id={`withdraw-${pot._id}`}
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
              </FieldGroup>
            </form>
            <Button
              disabled={isPending}
              className="cursor-pointer lg:text-[16px] mt-4 lg:py-5"
              variant={"secondary"}
              type="submit"
              form="withdraw-money-form"
            >
              {isPending ? <Spinner /> : "Confirm"}
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
