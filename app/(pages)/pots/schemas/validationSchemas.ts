import * as z from "zod";
import { Pot } from "../types/potTypes";

export const editFormSchemaSep = z.object({
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
      message: "Auto-detection is not allowed. Please select a specific theme.",
    }),
});

export const addMoneySchemaSep = (pot: Pot) => {
  return z.object({
    potAmountValue: z
      .number("Must be a number")
      .min(1, "You can add money at least 1 dollar.")
      .max(
        pot.potAmount - pot.potAmountValue, // ← Uses pot!
        `You can add money at most $${
          pot.potAmount - pot.potAmountValue
        } dollars.`
      ),
  });
};

export const withdrawMoenySchemaSep = (pot: Pot) => {
  return z.object({
    potAmountValue: z
      .number("Must be a number")
      .min(1, "Withdraw need to be at least $1.")
      .max(
        pot.potAmountValue,
        `You can withdraw at most $${pot.potAmountValue}.`
      ),
  });
};
