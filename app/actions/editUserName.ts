"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import { revalidatePath } from "next/cache";
import User from "../(auth)/(pages)/sign-up/models/userSchema";

export async function editUserName(
  userNameId: string,
  data: {
    name: string;
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

    const userName = await User.findById(userNameId).lean();

    if (!userName) {
      return {
        success: false,
        error: "User not found",
      };
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userNameId },
      {
        name: data.name,
      },
      { new: true }
    );

    if (!updatedUser) {
      return {
        success: false,
        error: "User not found or you don't have permission.",
      };
    }

    revalidatePath("/");

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
