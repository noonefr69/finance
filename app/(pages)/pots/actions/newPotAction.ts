"use server";

import z from "zod";

const formSchema = z.object({
  potName: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  potAmount: z
    .number("Must be Number")
    .min(1, "Amount must be at least 1.")
    .max(1000000, "AMount Must be less than 1000000.")
    .nullable(),
});

export async function newPotAction(data: z.infer<typeof formSchema>) {
  const { potName, potAmount } = data;

  console.log(data);

}
