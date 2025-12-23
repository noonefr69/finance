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
import { WithdrawMoneyPotDialogProps } from "../types/potTypes";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { calculatePercentage, formatCurrency } from "../utils/potUtils";

export default function WithdrawMoneyPotDialog({
  pot,
  isOpen,
  onOpenChange,
  onSubmit,
  isPending,
  potAmountValSecCl,
  setPotAmountValSecCl,
  schema,
}: WithdrawMoneyPotDialogProps) {
  const withdrawMoneyForm = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      potAmountValue: undefined as unknown as number,
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Withdraw from '{pot.potName}'</DialogTitle>
          <DialogDescription>
            Withdraw from your pot to put money back in your main balance. This
            will reduce the amount you have in this pot.
          </DialogDescription>
          <div>
            <div className="flex items-center justify-between my-5">
              <h5 className="text-lg font-semibold ">Currently Saved</h5>
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
                  width: `${calculatePercentage(
                    pot.potAmountValue,
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
                    width: `${calculatePercentage(
                      Number(potAmountValSecCl),
                      pot.potAmountValue
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <h1 className="text-muted-foreground font-semibold">
                {formatCurrency(
                  calculatePercentage(pot.potAmountValue, pot.potAmount) -
                    calculatePercentage(
                      Number(potAmountValSecCl),
                      pot.potAmount
                    )
                )}
                %
              </h1>
              <h1 className="text-muted-foreground font-semibold">
                Target of ${formatCurrency(pot.potAmount)}
              </h1>
            </div>
          </div>
          <form
            id="withdraw-money-form"
            onSubmit={withdrawMoneyForm.handleSubmit(onSubmit)}
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
            variant={"default"}
            type="submit"
            form="withdraw-money-form"
          >
            {isPending ? <Spinner /> : "Confirm"}
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
