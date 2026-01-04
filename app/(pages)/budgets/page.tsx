import { getTransactionAction } from "../transactions/actions/getTransactionAction";
import { Transaction } from "../transactions/types/transactionTypes";
import { getBudgetsAction } from "./actions/getBudgetsAction";
import AddNewBudget from "./components/AddNewBudget";
import BudgetsCard from "./components/BudgetsCard";
import { ChartPieDonutText } from "./components/ChartPieDonutText";
import { EmptyModel } from "./components/EmptyModel";
import { Budget } from "./types/budgetsTypes";

export default async function BudgetsPage() {
  const rawBudgets = await getBudgetsAction();
  const rawTransactions = await getTransactionAction();

  const budgets = JSON.parse(JSON.stringify(rawBudgets));
  const transactions = JSON.parse(JSON.stringify(rawTransactions));

  const budgetsItems: Budget[] = Array.isArray(budgets?.data)
    ? budgets.data
    : [];
  const transactionItems: Transaction[] = Array.isArray(transactions?.data)
    ? transactions.data
    : [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-medium lg:text-3xl">Budgets</h1>
        <AddNewBudget />
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-9 space-y-2 md:space-y-0 md:gap-4">
        {budgetsItems.length === 0 ? (
          <EmptyModel />
        ) : (
          <>
            <div className="grid col-span-1 md:col-span-4 lg:col-span-3 shrink">
              <ChartPieDonutText
                budgets={budgetsItems}
                transactions={transactionItems}
              />
            </div>
            <div className="grid col-span-1 md:col-span-5 lg:col-span-6 gap-4">
              {budgetsItems.map((b) => (
                <div key={b._id}>
                  <BudgetsCard budget={b} transactions={transactionItems} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
