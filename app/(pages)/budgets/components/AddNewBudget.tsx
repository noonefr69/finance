"use client";

import { Button } from "@/components/ui/button";
import { useNewBudgetsActions } from "../hooks/useNewBudgetsActions";
import DialogAddNewBudget from "./DialogAddNewBudget";

export default function AddNewBudget() {
  const {
    isPending,
    isNewBudgetOpen,
    setIsNewBudgetOpen,
    newBudgetform,
    handleCreateBudget,
  } = useNewBudgetsActions();

  return (
    <>
      <Button
        onClick={() => setIsNewBudgetOpen(true)}
        className="cursor-pointer"
      >
        New budget
      </Button>
      <DialogAddNewBudget
        isOpen={isNewBudgetOpen}
        setIsOpen={setIsNewBudgetOpen}
        form={newBudgetform}
        isPending={isPending}
        onSubmit={handleCreateBudget}
      />
    </>
  );
}
