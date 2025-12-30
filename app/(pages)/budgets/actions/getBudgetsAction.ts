"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Budget from "../models/budgetSchema";

export async function getBudgetsAction() {
  try {
    const session = await auth();
    if (!session?.user) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    await dbConnect();

    const budgets = await Budget.find({
      userEmail: session.user.email,
    });

    return {
      success: true,
      error: null,
      data: budgets,
    };
  } catch (err) {
    console.error("getTransationAction error:", err);

    return {
      success: false,
      error: "Something went wrong. please try again later!",
      data: null,
    };
  }
}
