import z from "zod";

export const newBudgetFormSchema = z.object({
  category: z
    .string()
    .min(1, "Please select your category.")
    .refine((val) => val !== "auto", {
      message:
        "Auto-detection is not allowed. Please select a specific language.",
    }),
  spend: z
    .number("Must be a number")
    .min(1, "Budget amount must be at least $1.")
    .max(10000, "Budget amount must be at most $10,000."),
  theme: z
    .string()
    .min(1, "Please select your theme.")
    .refine((val) => val !== "auto", {
      message:
        "Auto-detection is not allowed. Please select a specific language.",
    }),
});

export const editBudgetFormSchema = z.object({
  category: z
    .string()
    .min(1, "Please select your category.")
    .refine((val) => val !== "auto", {
      message:
        "Auto-detection is not allowed. Please select a specific language.",
    }),
  spend: z
    .number("Must be a number")
    .min(1, "Budget amount must be at least $1.")
    .max(10000, "Budget amount must be at most $10,000."),
  theme: z
    .string()
    .min(1, "Please select your theme.")
    .refine((val) => val !== "auto", {
      message:
        "Auto-detection is not allowed. Please select a specific language.",
    }),
});
