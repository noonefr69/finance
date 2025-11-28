import z from "zod";

export const formSchema = z.object({
  userEmail: z
    .email("Must be email")
    .min(9, "Email must be at least 9 characters.")
    .max(70, "Email must be at most 70 characters."),
  userPassword: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(30, "Password must be at most 30 characters."),
});
