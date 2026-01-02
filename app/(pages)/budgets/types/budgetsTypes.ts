import z from "zod";
import {
  editBudgetFormSchema,
  newBudgetFormSchema,
} from "../schema/validationSchemas";
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

export interface DialogDeleteBudgetCardProps {
  budget: Budget;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSubmit: () => void;
  isPending: boolean;
}

export interface DialogEditBudgetProps {
  budget: Budget;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSubmit: (data: z.infer<typeof editBudgetFormSchema>) => void;
  isPending: boolean;
  form: UseFormReturn<z.infer<typeof editBudgetFormSchema>>;
}
