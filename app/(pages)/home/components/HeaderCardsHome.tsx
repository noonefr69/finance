import { getBudgetsAction } from "../../budgets/actions/getBudgetsAction";
import { Budget } from "../../budgets/types/budgetsTypes";
import { getTransactionAction } from "../../transactions/actions/getTransactionAction";
import { Transaction } from "../../transactions/types/transactionTypes";
import HeaderCards from "./HeaderCards";

export default async function HeaderCardsHome() {
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

  const budgetsItemsAmount = budgetsItems.reduce(
    (a, b) => a + Number(b.spend),
    0
  );
  const transactionItemsAmount = transactionItems.reduce(
    (a, b) => a + Number(b.transactionAmount),
    0
  );

  const diff = budgetsItemsAmount - transactionItemsAmount;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <HeaderCards
        className={`bg-accent-foreground text-accent`}
        number={diff}
        title="Balance"
      />
      <HeaderCards number={transactionItemsAmount} title="Transactions" />
      <HeaderCards number={budgetsItemsAmount} title="Budget" />
    </div>
  );
}
