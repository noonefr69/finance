"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import { revalidatePath } from "next/cache";
import Transaction from "../models/transactionSchema";

export async function editTransactionAction(
  transactionId: string,
  data: {
    transactionName: string;
    transactionDate: string;
    transactionCategory: string;
    transactionAmount: number;
    transactionRecurring: boolean;
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

    const transaction = await Transaction.findById(transactionId).lean();

    if (!transaction) {
      return {
        success: false,
        error: "Transaction not found",
      };
    }

    if (transaction.userEmail !== session.user.email) {
      return {
        success: false,
        error: "Forbidden",
      };
    }

    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: transactionId, userEmail: session.user.email },
      {
        transactionName: data.transactionName,
        transactionDate: data.transactionDate,
        transactionCategory: data.transactionCategory,
        transactionAmount: data.transactionAmount,
        transactionRecurring: data.transactionRecurring,
      },
      { new: true }
    );

    if (!updatedTransaction) {
      return {
        success: false,
        error: "Transaction not found or you don't have permission.",
      };
    }

    revalidatePath("/transactions");

    return {
      success: true,
      error: null,
    };
  } catch (err) {
    console.error("edit Transaction error:", err);

    return {
      success: false,
      error: "Something went wrong. Please try again later!",
    };
  }
}
