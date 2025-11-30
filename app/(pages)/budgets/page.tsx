import React from "react";
import AddNewBudgets from "./components/AddNewBudgets";

export default function BudgetsPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-medium lg:text-3xl">Budgets</h1>
        <AddNewBudgets />
      </div>
      <div className="mt-10"></div>
    </div>
  );
}
