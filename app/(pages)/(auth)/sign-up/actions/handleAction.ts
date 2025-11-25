"use server";

import dbConnect from "@/lib/db";
import { formSchema } from "../schema/formSchema";
import z from "zod";
import User from "../models/userSchema";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function onSubmit(data: z.infer<typeof formSchema>) {
  const { userName, userEmail, userPassword } = data;
  const hashedPassword = await bcrypt.hash(userPassword, 10);

  try {
    await dbConnect();

    const existingUser = await User.findOne({ email: userEmail });

    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    await User.create({
      email: userEmail,
      name: userName,
      password: hashedPassword,
    });

    return { success: true, message: "User created!" };
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
}
