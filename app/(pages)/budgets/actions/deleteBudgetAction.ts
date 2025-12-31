"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import { revalidatePath } from "next/cache";
import Budget from "../models/budgetSchema";

export async function deleteBudgetAction(budgetId: string) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    await dbConnect();

    const budget = await Budget.findById(budgetId).lean();

    if (!budget) {
      return {
        success: false,
        error: "Pot not found",
      };
    }

    if (budget.userEmail !== session.user.email) {
      return {
        success: false,
        error: "Forbidden",
      };
    }

    await Budget.findByIdAndDelete(budgetId);

    revalidatePath("/budgets");

    return {
      success: true,
      error: null,
    };
  } catch (err) {
    console.error("deleteBudgetAction error:", err);

    return {
      success: false,
      error: "Something went wrong. Please try again later!",
    };
  }
}
