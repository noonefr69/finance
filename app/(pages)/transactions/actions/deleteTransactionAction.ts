"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Transaction from "../models/transactionSchema";
import { revalidatePath } from "next/cache";

export async function deleteTransactionAction(transactionId: string) {
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
        error: "Pot not found",
      };
    }

    if (transaction.userEmail !== session.user.email) {
      return {
        success: false,
        error: "Forbidden",
      };
    }

    await Transaction.findByIdAndDelete(transactionId);

    revalidatePath("/transactions");

    return {
      success: true,
      error: null,
    };
  } catch (err) {
    console.error("deletePotAction error:", err);

    return {
      success: false,
      error: "Something went wrong. Please try again later!",
    };
  }
}
