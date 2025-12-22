"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import {
  addMoneySchemaSep,
  editFormSchemaSep,
} from "../schemas/validationSchemas";
import {
  AddMoneyPotDialogProps,
  EditPotDialogProps,
  Pot,
} from "../types/potTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { POT_THEMES } from "../constants/potThemes";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { calculatePercentage, formatCurrency } from "../utils/potUtils";

export default function AddMoneyPotDialog({
  pot,
  isOpen,
  onOpenChange,
  onSubmit,
  isPending,
  potAmountValCl,
  setPotAmountValCl,
  schema,
}: AddMoneyPotDialogProps) {
  const addMoneyForm = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      potAmountValue: undefined as unknown as number,
    },
  });
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to ‘{pot.potName}’</DialogTitle>
          <DialogDescription>
            Add money to your pot to keep it separate from your main balance. As
            soon as you add this money, it will be deducted from your current
            balance.
          </DialogDescription>
          <div>
            <div className="flex items-center justify-between my-5">
              <h5 className="text-lg font-semibold ">New Amount</h5>
              <h1 className="md:text-4xl font-semibold">
                $
                {(Number(pot.potAmountValue) + Number(potAmountValCl)).toFixed(
                  2
                )}
              </h1>
            </div>
            <div className="h-2 flex items-center overflow-hidden w-full bg-accent rounded-2xl">
              <div
                className="h-2 duration-200 transition-all"
                style={{
                  backgroundColor: pot.potTheme,
                  width: `${calculatePercentage(
                    pot.potAmountValue,
                    pot.potAmount
                  )}%`,
                }}
              ></div>
              <div
                className={`${
                  pot.potAmountValue == pot.potAmount ? "hidden" : "block"
                } h-2 duration-200 transition-all`}
                style={{
                  opacity: `40%`,
                  backgroundColor: pot.potTheme,
                  width: `${calculatePercentage(
                    Number(potAmountValCl),
                    pot.potAmount
                  )}%`,
                }}
              ></div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <h1 className="text-muted-foreground font-semibold">
                {formatCurrency(
                  calculatePercentage(pot.potAmountValue, pot.potAmount) +
                    calculatePercentage(Number(potAmountValCl), pot.potAmount)
                )}
                %
              </h1>
              <h1 className="text-muted-foreground font-semibold">
                Target of ${formatCurrency(pot.potAmount)}
              </h1>
            </div>
          </div>
          <form
            id="add-money-form"
            onSubmit={addMoneyForm.handleSubmit(onSubmit)}
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
  );
}
