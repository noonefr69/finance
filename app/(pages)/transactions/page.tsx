import { getTransactionAction } from "./actions/getTransactionAction";
import AddNewTransaction from "./components/NewTransactionDialog";
import TransactionsTable from "./components/TransactionsTable";
import { Transaction } from "./types/transactionTypes";

export default async function TransactionsPage() {
  const rawTransactions = await getTransactionAction();
  const transactions = JSON.parse(JSON.stringify(rawTransactions));

  const items: Transaction[] = Array.isArray(transactions?.data)
    ? transactions.data
    : [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-medium lg:text-3xl">Transactions</h1>
        <AddNewTransaction />
      </div>
      <div className="mt-10">
        {items.length === 0 ? <div>No data</div> : <TransactionsTable />}
      </div>
    </div>
  );
}
