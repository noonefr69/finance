import { getBudgetsAction } from "../budgets/actions/getBudgetsAction";
import { Budget } from "../budgets/types/budgetsTypes";
import { getPotsAction } from "../pots/actions/getPotsAction";
import { Pot } from "../pots/types/potTypes";
import { getTransactionAction } from "../transactions/actions/getTransactionAction";
import { Transaction } from "../transactions/types/transactionTypes";
import Budgets from "./components/Budgets";
import HeaderCardsHome from "./components/HeaderCardsHome";
import Pots from "./components/Pots";
import RecurringBills from "./components/RecurringBills";
import Transactions from "./components/Transactions";

export default async function Home() {
  const rawBudgets = await getBudgetsAction();
  const rawTransactions = await getTransactionAction();
  const rawPots = await getPotsAction();

  const budgets = JSON.parse(JSON.stringify(rawBudgets));
  const transactions = JSON.parse(JSON.stringify(rawTransactions));
  const pots = JSON.parse(JSON.stringify(rawPots));

  const budgetsItems: Budget[] = Array.isArray(budgets?.data)
    ? budgets.data
    : [];
  const transactionItems: Transaction[] = Array.isArray(transactions?.data)
    ? transactions.data
    : [];
  const potsItems: Pot[] = Array.isArray(pots?.data) ? pots.data : [];

  return (
    <div className="">
      <HeaderCardsHome
        budgetsItems={budgetsItems}
        transactionItems={transactionItems}
      />
      <div className="columns-1 lg:columns-2 space-y-4 mt-10">
        <Pots pots={potsItems} />
        <Budgets budgets={budgetsItems} transactions={transactionItems} />
        <Transactions transactions={transactionItems} />
        <RecurringBills transactions={transactionItems} />
      </div>
    </div>
  );
}
