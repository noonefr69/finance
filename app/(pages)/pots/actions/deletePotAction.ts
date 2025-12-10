"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Pot from "../models/potSchema";
import { revalidatePath } from "next/cache";

export async function deletePotAction(potId: string) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    await dbConnect();

    const pot = await Pot.findById(potId).lean();

    if (!pot) {
      return {
        success: false,
        error: "Pot not found",
      };
    }

    if (pot.userEmail !== session.user.email) {
      return {
        success: false,
        error: "Forbidden",
      };
    }

    await Pot.findByIdAndDelete(potId);

    revalidatePath("/pots");
    
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
