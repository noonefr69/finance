import * as z from "zod";

export const formSchema = z.object({
  transactionName: z
    .string()
    .min(3, "Transaction name must be at least 3 characters.")
    .max(32, "Transaction name must be at most 32 characters."),
  transactionDate: z.string("Must be a date.").min(1, "Please select a date."),
  transactionCategory: z
    .string("Must be a category.")
    .min(1, "Please select your category.")
    .refine((val) => val !== "auto", {
      message: "Auto-detection is not allowed. Please select a specific theme.",
    }),
  transactionAmount: z
    .number("Amount is required.")
    .max(100000, "Transaction amount must be at most $100,000."),
  transactionRecurring: z.boolean(" "),
});
