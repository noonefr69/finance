import z from "zod";
import { editTransactionFormSchema } from "../schema/validationSchemas";

export type Transaction = {
  _id: string;
  userEmail: string;
  transactionName: string;
  transactionDate: string;
  transactionCategory: string;
  transactionAmount: number;
  transactionRecurring: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export interface DeleteTransactionDialogProps {
  row: Transaction;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (row: Transaction) => void;
  isPending: boolean;
}

export interface EditTransactionDialogProps {
  id: string;
  row: Transaction;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (row: z.infer<typeof editTransactionFormSchema>) => void;
  isPending: boolean;
}
