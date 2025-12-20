// pots/schemas/potSchemas.ts
import * as z from "zod";

export const createPotSchema = z.object({
  potName: z.string().min(3).max(30),
  potAmount: z.number().min(1),
  potTheme: z
    .string()
    .min(1)
    .refine((v) => v !== "auto"),
});

export const editPotSchema = createPotSchema;

export const addMoneySchema = (max: number) =>
  z.object({
    potAmountValue: z.number().min(1).max(max),
  });

export const withdrawMoneySchema = (max: number) =>
  z.object({
    potAmountValue: z.number().min(1).max(max),
  });
