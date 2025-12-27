"use server";

import { auth } from "@/auth";
import Transaction from "../models/transactionSchema";
import dbConnect from "@/lib/db";

export async function getTransactionAction() {
  try {
    const session = await auth();
    if (!session?.user) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    await dbConnect();

    const transactions = await Transaction.find({
      userEmail: session.user.email,
    });

    return {
      success: true,
      error: null,
      data: transactions,
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
