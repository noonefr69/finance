import AddNewTransaction from "./components/NewTransactionDialog";
import TransactionsTable from "./components/TransactionsTable";

export default function TransactionsPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-medium lg:text-3xl">Transactions</h1>
        <AddNewTransaction />
      </div>
      <div className="mt-10">
        <TransactionsTable />
      </div>
    </div>
  );
}
