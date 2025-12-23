"use server";

import z from "zod";
import { formSchema } from "../schema/formSchema";
import { auth } from "@/auth";
import Transaction from "../models/transactionSchema";
import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/db";

export async function createTransactionAction(
  data: z.infer<typeof formSchema>
) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized!");
    const userEmail = session?.user?.email;

    await dbConnect();

    const {
      transactionName,
      transactionDate,
      transactionCategory,
      transactionAmount,
      transactionRecurring,
    } = data;

    await Transaction.create({
      userEmail,
      transactionName,
      transactionDate,
      transactionCategory,
      transactionAmount,
      transactionRecurring,
    });

    revalidatePath("/transactions");

    return { success: true, message: "Transaction Created." };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Server error. Please try again later." };
  }
}
