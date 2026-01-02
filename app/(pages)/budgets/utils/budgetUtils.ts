import { Transaction } from "../../transactions/types/transactionTypes";
import { Budget } from "../types/budgetsTypes";

export function transactionsReducer(
  budget: Budget,
  transactions: Transaction[]
) {
  return Math.abs(
    transactions
      .filter((t) => t.transactionCategory === budget.category)
      .reduce((sum, t) => sum + Number(t.transactionAmount), 0)
  );
}

export function isTransactionBiggerThanBudget(
  budget: Budget,
  transactions: Transaction[]
) {
  return budget.spend - transactionsReducer(budget, transactions) < 0
    ? "text-red-500"
    : "";
}
