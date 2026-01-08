"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Budget } from "../types/budgetsTypes";
import { Transaction } from "../../transactions/types/transactionTypes";
import DialogEditBudget from "./DialogEditBudget";
import DialogDeleteBudget from "./DialogDeleteBudget";
import { useBudgetsCardAction } from "../hooks/useBudgetsCardAction";
import BudgetCardFooter from "./BudgetCardFooter";
import BudgetCardHeader from "./BudgetCardHeader";
import BudgetCardContent from "./BudgetCardContent";
export default function BudgetsCard({
  budget,
  transactions,
}: {
  budget: Budget;
  transactions: Transaction[];
}) {
  const {
    isEditOpen,
    isDeleteOpen,
    isPending,
    setIsDeleteOpen,
    setIsEditOpen,
    editBudgetform,
    handleDelete,
    handleEdit,
  } = useBudgetsCardAction(budget);

  return (
    <Card className="h-fit">
      <CardHeader>
        <BudgetCardHeader
          budget={budget}
          transactions={transactions}
          setIsDeleteOpen={setIsDeleteOpen}
          setIsEditOpen={setIsEditOpen}
        />
      </CardHeader>
      <CardContent>
        <BudgetCardContent budget={budget} transactions={transactions} />
      </CardContent>
      <CardFooter>
        <BudgetCardFooter budget={budget} transactions={transactions} />
      </CardFooter>

      <DialogDeleteBudget
        budget={budget}
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        isPending={isPending}
        onSubmit={handleDelete}
      />

      <DialogEditBudget
        id={budget._id}
        isOpen={isEditOpen}
        isPending={isPending}
        setIsOpen={setIsEditOpen}
        form={editBudgetform}
        budget={budget}
        onSubmit={handleEdit}
      />
    </Card>
  );
}
