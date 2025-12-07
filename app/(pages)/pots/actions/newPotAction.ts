"use server";

import z from "zod";
import Pot from "../models/potSchema";
import dbConnect from "@/lib/db";

const formSchema = z.object({
  potName: z
    .string()
    .min(3, "Pot name must be at least 3 characters.")
    .max(30, "Pot name must be at most 30 characters."),
  potAmount: z.coerce
    .number()
    .min(1, "Amount must be at least 1.")
    .or(z.literal(0).refine(() => false, { message: "Amount is required" })),
  potTheme: z
    .string()
    .min(1, "Please select your theme.")
    .refine((val) => val !== "auto", {
      message: "Auto-detection is not allowed. Please select a specific theme.",
    }),
});

export async function newPotAction(rawData: unknown) {
  const parsed = formSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0].message,
    };
  }

  const { potName, potAmount, potTheme } = parsed.data;

  try {
    await dbConnect();

    await Pot.create({
      potName,
      potAmount,
      potTheme,
    });

    return { success: true, message: "Pot Created." };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Server error. Please try again later." };
  }
}
