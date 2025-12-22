"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Pot } from "../types/potTypes";
import { deletePotAction } from "../actions/deletePotAction";
import { editPotAction } from "../actions/editPotAction";
import { addMoneyAction } from "../actions/addMoneyAction";
import { withdrawMoneyAction } from "../actions/withdrawMoneyAction";
import z from "zod";
import {
  addMoneySchemaSep,
  editFormSchemaSep,
  withdrawMoenySchemaSep,
} from "../schemas/validationSchemas";

export function usePotActions(pot: Pot) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [potAmountValCl, setPotAmountValCl] = useState("");
  const [potAmountValSecCl, setPotAmountValSecCl] = useState("");

  const [isPending, startTransition] = useTransition();

  function handleDelete(potId: string) {
    startTransition(async () => {
      try {
        const result = await deletePotAction(potId);

        if (!result?.success) {
          return;
        }

        setIsDeleteOpen(false);
        toast.success(`${pot.potName} deleted!`);
      } catch (error) {
        console.error("Something went wrong. Please try later.");
      }
    });
  }

  function handleEdit(data: z.infer<typeof editFormSchemaSep>) {
    startTransition(async () => {
      try {
        const result = await editPotAction(pot._id, data);

        if (!result.success) {
          return;
        }

        setIsEditOpen(false);
        toast.success(`Pot edited.`);
      } catch (err) {
        console.error(err);

        toast.error("Something went wrong. Please try later.");
      }
    });
  }

  function handleAddMoney(data: z.infer<ReturnType<typeof addMoneySchemaSep>>) {
    startTransition(async () => {
      try {
        const result = await addMoneyAction(pot._id, data);
        if (!result.success) {
          return;
        }

        setIsAddMoneyOpen(false);
        toast.success(`Money added.`);
      } catch (err) {
        console.error(err);

        toast.error("Something went wrong. Please try later.");
      }
    });
  }

  function handleWithdrawMoney(
    data: z.infer<ReturnType<typeof withdrawMoenySchemaSep>>
  ) {
    startTransition(async () => {
      try {
        const result = await withdrawMoneyAction(pot._id, data);
        if (!result.success) {
          return;
        }

        setIsWithdrawOpen(false);
        toast.success(`Withdraw succesull.`);
      } catch (err) {
        console.error(err);

        toast.error("Something went wrong. Please try later.");
      }
    });
  }

  return {
    // States
    isPending,
    isEditOpen,
    setIsEditOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    isAddMoneyOpen,
    setIsAddMoneyOpen,
    isWithdrawOpen,
    setIsWithdrawOpen,
    potAmountValCl,
    setPotAmountValCl,
    potAmountValSecCl,
    setPotAmountValSecCl,

    // Handlers
    handleDelete,
    handleEdit,
    handleAddMoney,
    handleWithdrawMoney,
  };
}
