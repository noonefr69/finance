import z from "zod";
import { newBudgetFormSchema } from "../schema/validationSchemas";
import { UseFormReturn } from "react-hook-form";

export type Budget = {
  _id: string;
  userEmail: string;
  category: string;
  spend: number;
  theme: string;
  createdAt?: string;
  updatedAt?: string;
};

export interface CreateNewBudgetDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSubmit: (data: z.infer<typeof newBudgetFormSchema>) => void;
  isPending: boolean;
  form: UseFormReturn<z.infer<typeof newBudgetFormSchema>>;
}
