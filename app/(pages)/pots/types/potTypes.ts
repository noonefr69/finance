import z from "zod";
import {
  addMoneySchemaSep,
  editFormSchemaSep,
  withdrawMoenySchemaSep,
} from "../schemas/validationSchemas";

export type Pot = {
  _id: string;
  userEmail: string;
  potName: string;
  potAmount: number;
  potAmountValue: number;
  potTheme: string;
  createdAt?: string;
  updatedAt?: string;
};

export interface EditPotDialogProps {
  pot: Pot;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: z.infer<typeof editFormSchemaSep>) => void;
  isPending: boolean;
}

export interface DeletePotDialogProps {
  pot: Pot;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (potId: string) => void;
  isPending: boolean;
}

export interface AddMoneyPotDialogProps {
  pot: Pot;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: z.infer<ReturnType<typeof addMoneySchemaSep>>) => void;
  isPending: boolean;
  potAmountValCl: string;
  setPotAmountValCl: (val: string) => void;
  schema: ReturnType<typeof addMoneySchemaSep>;
}

export interface WithdrawMoneyPotDialogProps {
  pot: Pot;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: z.infer<ReturnType<typeof withdrawMoenySchemaSep>>) => void;
  isPending: boolean;
  potAmountValSecCl: string;
  setPotAmountValSecCl: (val: string) => void;
  schema: ReturnType<typeof withdrawMoenySchemaSep>;
}
