"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";

const signInSchema = z.object({
  userEmail: z.string().email(),
  userPassword: z.string().min(1),
});

export async function signInAction(data: z.infer<typeof signInSchema>) {
  const validatedFields = signInSchema.safeParse(data);

  if (!validatedFields.success) {
    return { success: false, message: "Invalid fields" };
  }

  const { userEmail, userPassword } = validatedFields.data;

  try {
    await signIn("credentials", {
      email: userEmail,
      password: userPassword,
      redirectTo: "/home",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { success: false, message: "Incorrect email or password!" };
      }
      return { success: false, message: "Something went wrong!" };
    }
    // ❌ DO NOT rethrow blindly
    throw error;
  }
}
