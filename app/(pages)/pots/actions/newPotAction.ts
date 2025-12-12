"use server";

import z from "zod";
import Pot from "../models/potSchema";
import dbConnect from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

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

  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized!");
  const userEmail = session?.user?.email;

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
      userEmail,
      potName,
      potAmount,
      potAmountValue: 0,
      potTheme,
    });

    revalidatePath("/pots");

    return { success: true, message: "Pot Created." };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Server error. Please try again later." };
  }
}
