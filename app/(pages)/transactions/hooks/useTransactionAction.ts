"use client";

import { useState, useTransition } from "react";
import { editTransactionFormSchema } from "../schema/validationSchemas";
import z from "zod";
import { editTransactionAction } from "../actions/editTransactionAction";
import { toast } from "sonner";
import { deleteTransactionAction } from "../actions/deleteTransactionAction";
import { Transaction } from "../types/transactionTypes";

export function useTransactionAction(transactionId: string) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleEdit(data: z.infer<typeof editTransactionFormSchema>) {
    startTransition(async () => {
      try {
        const result = await editTransactionAction(transactionId, data);
        if (result.success) {
          setIsEditOpen(false);
          toast.success(`Transaction updated.`);
        }
      } catch (error) {
        console.log(error);
        toast.error(`Something went wrong. Please try again later`);
      }
    });
  }

  function handledelet(row: Transaction) {
    startTransition(async () => {
      try {
        const result = await deleteTransactionAction(row._id);

        if (result.success) {
          setIsDeleteOpen(false);
          toast.success(`${row.transactionName} deleted.`);
        }
      } catch (err) {
        console.error(err);

        toast.error(`Something went wrong. Please try again later.`);
      }
    });
  }

  return {
    // states
    isPending,
    isDeleteOpen,
    setIsDeleteOpen,
    isEditOpen,
    setIsEditOpen,

    // handlers
    handleEdit,
    handledelet,
  };
}
