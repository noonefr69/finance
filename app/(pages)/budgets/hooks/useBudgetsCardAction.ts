"use client";

import z from "zod";
import { editBudgetFormSchema } from "../schema/validationSchemas";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editBudgetAction } from "../actions/editBudgetAction";
import { toast } from "sonner";
import { Budget } from "../types/budgetsTypes";
import { deleteBudgetAction } from "../actions/deleteBudgetAction";

export function useBudgetsCardAction(budget: Budget) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const editBudgetform = useForm<z.infer<typeof editBudgetFormSchema>>({
    resolver: zodResolver(editBudgetFormSchema),
    defaultValues: {
      category: budget.category,
      spend: budget.spend,
      theme: budget.theme,
    },
  });

  function handleDelete() {
    startTransition(async () => {
      try {
        const result = await deleteBudgetAction(budget._id);
        if (result.success) {
          setIsDeleteOpen(false);
          toast.success(`${budget.category} deleted!`);
        }
      } catch (err) {
        console.error(err);
        toast.error(`Something went wrong. please try again later!`);
      }
    });
  }

  function handleEdit(data: z.infer<typeof editBudgetFormSchema>) {
    startTransition(async () => {
      try {
        const result = await editBudgetAction(budget._id, data);
        if (result.success) {
          setIsEditOpen(false);
          toast.success(`Budget edited.`);
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
    isEditOpen,
    setIsEditOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    editBudgetform,

    // handlers
    handleEdit,
    handleDelete,
  };
}
