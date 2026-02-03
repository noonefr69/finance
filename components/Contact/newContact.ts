"use server";

import z from "zod";
import dbConnect from "@/lib/db";
import { revalidatePath } from "next/cache";
import Contact from "./formschwma";

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(32, "Name must be at most 32 characters."),
  email: z
    .string()
    .email("Please enter a valid email address.")
    .min(5, "Email must be at least 5 characters.")
    .max(100, "Email must be at most 100 characters."),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters.")
    .max(100, "Description must be at most 100 characters."),
});

export async function newContact(rawData: unknown) {
  const parsed = formSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0].message,
    };
  }

  const { name, email, description } = parsed.data;

  try {
    await dbConnect();

    await Contact.create({
      name,
      email,
      description,
    });

    revalidatePath("/");

    return { success: true, message: "Contact Created." };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Server error. Please try again later." };
  }
}
