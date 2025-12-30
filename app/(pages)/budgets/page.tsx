import { getTransactionAction } from "../transactions/actions/getTransactionAction";
import { Transaction } from "../transactions/types/transactionTypes";
import { getBudgetsAction } from "./actions/getBudgetsAction";
import AddNewBudget from "./components/AddNewBudget";
import { ChartPieDonutText } from "./components/ChartPieDonutText";
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
      <div className="mt-10 grid md:grid-cols-9 md:gap-4">
        <div className="grid col-span-3">
          <ChartPieDonutText budgets={budgetsItems} transactions={transactionItems}/>
        </div>
        <div className="grid col-span-6">cyka</div>
      </div>
    </div>
  );
}
