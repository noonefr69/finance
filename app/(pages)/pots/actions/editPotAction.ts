"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Pot from "../models/potSchema";
import { revalidatePath } from "next/cache";

export async function editPotAction(
  potId: string,
  data: {
    potName: string;
    potAmount: number;
    potTheme: string;
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

    const updatedPot = await Pot.findOneAndUpdate(
      { _id: potId, userEmail: session.user.email },
      {
        potName: data.potName,
        potAmount: data.potAmount,
        potTheme: data.potTheme,
      },
      { new: true }
    );

    if (!updatedPot) {
      return {
        success: false,
        error: "Pot not found or you don't have permission.",
      };
    }

    revalidatePath("/pots");

    return {
      success: true,
      error: null,
    };
  } catch (err) {
    console.error("editPotAction error:", err);

    return {
      success: false,
      error: "Something went wrong. Please try again later!",
    };
  }
}
