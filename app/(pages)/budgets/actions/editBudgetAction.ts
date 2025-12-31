"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import { revalidatePath } from "next/cache";
import Budget from "../models/budgetSchema";

export async function editBudgetAction(
  budgetId: string,
  data: {
    category: string;
    spend: number;
    theme: string;
  }
) {
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
        error: "Budget not found",
      };
    }

    if (budget.userEmail !== session.user.email) {
      return {
        success: false,
        error: "Forbidden",
      };
    }

    const updatedBudget = await Budget.findOneAndUpdate(
      { _id: budgetId, userEmail: session.user.email },
      {
        category: data.category,
        spend: data.spend,
        theme: data.theme,
      },
      { new: true }
    );

    if (!updatedBudget) {
      return {
        success: false,
        error: "Budget not found or you don't have permission.",
      };
    }

    revalidatePath("/budgets");

    return {
      success: true,
      error: null,
    };
  } catch (err) {
    console.error("edit Budget error:", err);

    return {
      success: false,
      error: "Something went wrong. Please try again later!",
    };
  }
}
