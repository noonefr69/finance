// actions/loginAction.ts
"use server";

import { signIn } from "@/auth"; // Check your import path
import { AuthError } from "next-auth";
import { z } from "zod";

// We can reuse the schema here if you export it, or define simple validation
const loginSchema = z.object({
  userEmail: z.string().email(),
  userPassword: z.string().min(1),
});

export async function loginAction(data: z.infer<typeof loginSchema>) {
  const validatedFields = loginSchema.safeParse(data);

  if (!validatedFields.success) {
    return { success: false, message: "Invalid fields" };
  }

  const { userEmail, userPassword } = validatedFields.data;

  try {
    // This calls the 'authorize' logic in auth.ts
    // If valid, it creates a cookie and redirects to "/"
    await signIn("credentials", {
      email: userEmail,
      password: userPassword,
      redirectTo: "/", // Redirect to home page after success
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid credentials!" };
        default:
          return { success: false, message: "Something went wrong!" };
      }
    }
    throw error; // You must re-throw standard errors for the redirect to work
  }
}
