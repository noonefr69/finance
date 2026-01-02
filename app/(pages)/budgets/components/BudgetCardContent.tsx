import { Budget } from "../types/budgetsTypes";
import { Transaction } from "../../transactions/types/transactionTypes";
import {
  isTransactionBiggerThanBudget,
  transactionsReducer,
} from "../utils/budgetUtils";

export default function BudgetCardContent({
  budget,
  transactions,
}: {
  budget: Budget;
  transactions: Transaction[];
}) {
  return (
    <>
      <h3
        className={`mb-2 ${
          budget.spend - transactionsReducer(budget, transactions) < 0
            ? "text-red-500"
            : "text-muted-foreground"
        }`}
      >
        Maximum of ${budget.spend.toFixed(2)}
      </h3>
      <div className="bg-accent w-full h-8 rounded-sm flex items-center px-1 mb-2">
        <div
          style={{
            backgroundColor:
              budget.spend - transactionsReducer(budget, transactions) < 0
                ? "red"
                : budget.theme,
            width: `${
              (transactionsReducer(budget, transactions) * 100) / budget.spend
            }%`,
          }}
          className="h-6 duration-200 rounded-sm"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 md:w-1/2 p-2 hover:bg-accent duration-200 rounded">
          <div
            className="h-10 w-1 rounded"
            style={{
              backgroundColor:
                budget.spend - transactionsReducer(budget, transactions) < 0
                  ? "red"
                  : budget.theme,
            }}
          />
          <div className=" gap-2">
            <h6
              className={`text-sm  ${
                budget.spend - transactionsReducer(budget, transactions) < 0
                  ? "text-red-500"
                  : "text-muted-foreground"
              }`}
            >
              Spent
            </h6>
            <h2
              className={`font-semibold ${isTransactionBiggerThanBudget(
                budget,
                transactions
              )}`}
            >
              ${transactionsReducer(budget, transactions).toFixed(2)}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-4 md:w-1/2 p-2 hover:bg-accent duration-200 rounded">
          <div
            className="h-10 w-1 rounded opacity-30"
            style={{
              backgroundColor:
                budget.spend - transactionsReducer(budget, transactions) < 0
                  ? "red"
                  : budget.theme,
            }}
          />
          <div className="">
            <h6
              className={`text-sm text-muted-foreground flex items-center gap-1 ${isTransactionBiggerThanBudget(
                budget,
                transactions
              )}`}
            >
              Free
            </h6>
            <h2
              className={`font-semibold ${isTransactionBiggerThanBudget(
                budget,
                transactions
              )}`}
            >
              {budget.spend - transactionsReducer(budget, transactions) < 0
                ? "-"
                : ""}
              $
              {Math.abs(
                budget.spend - transactionsReducer(budget, transactions)
              ).toFixed(2)}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
