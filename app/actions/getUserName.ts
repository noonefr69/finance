"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import User from "../(auth)/(pages)/sign-up/models/userSchema";

export async function getUserName() {
  try {
    const session = await auth();
    if (!session?.user) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    await dbConnect();

    const userName = await User.findOne({ email: session.user.email })
      .select("name")
      .lean();

    return {
      success: true,
      error: null,
      data: userName,
    };
  } catch (err) {
    console.error("get user name error:", err);

    return {
      success: false,
      error: "Something went wrong. please try again later!",
      data: null,
    };
  }
}
