"use client";

import { useState, useTransition } from "react";
import z from "zod";
import { newBudgetFormSchema } from "../schema/validationSchemas";
import { createBudgetAction } from "../actions/createBudgetAction";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function useNewBudgetsActions() {
  const [isNewBudgetOpen, setIsNewBudgetOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const newBudgetform = useForm<z.infer<typeof newBudgetFormSchema>>({
    resolver: zodResolver(newBudgetFormSchema),
    defaultValues: {
      category: "",
      spend: undefined as unknown as number,
      theme: "",
    },
  });

  function handleCreateBudget(data: z.infer<typeof newBudgetFormSchema>) {
    startTransition(async () => {
      try {
        const result = await createBudgetAction(data);
        if (result.success) {
          setIsNewBudgetOpen(false);
          toast.success("Budget created!");
        }
        newBudgetform.reset();
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong. Please try again later!");
      }
    });
  }

  return {
    // states
    isPending,
    isNewBudgetOpen,
    setIsNewBudgetOpen,
    newBudgetform,

    // handlers
    handleCreateBudget,
  };
}
