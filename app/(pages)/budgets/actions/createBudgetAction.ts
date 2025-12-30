"use server";

import z from "zod";
import { newBudgetFormSchema } from "../schema/validationSchemas";
import dbConnect from "@/lib/db";
import { auth } from "@/auth";
import Budget from "../models/budgetSchema";
import { revalidatePath } from "next/cache";

export async function createBudgetAction(
  data: z.infer<typeof newBudgetFormSchema>
) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized!");
    const userEmail = session?.user?.email;

    await dbConnect();

    const { category, spend, theme } = data;

    await Budget.create({
      userEmail,
      category,
      spend,
      theme,
    });

    revalidatePath("/budgets");

    return { success: true, message: "Budget Created." };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Server error. Please try again later." };
  }
}
