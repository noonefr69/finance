"use server";

import dbConnect from "@/lib/db";
import Pot from "../models/potSchema";
import { auth } from "@/auth";

export async function getPotsAction() {
  try {
    const session = await auth();
    if (!session?.user) {
      return {
        success: false,
        error: "Unauthorized",
        data: null,
      };
    }
    
    await dbConnect();

    const pots = await Pot.find({ userEmail: session.user.email }).lean();

    return {
      success: true,
      error: null,
      data: pots,
    };
  } catch (err) {
    console.error("getPotsAction error:", err);

    return {
      success: false,
      error: "Something went wrong. please try again later!",
      data: null,
    };
  }
}
