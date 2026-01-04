import { getTransactionAction } from "./actions/getTransactionAction";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import DataTableMobile from "./components/DataTableMobile";
import { EmptyModel } from "./components/EmptyModel";
import AddNewTransaction from "./components/NewTransactionDialog";
import { Transaction } from "./types/transactionTypes";

export default async function TransactionsPage() {
  const rawTransactions = await getTransactionAction();
  const transactions = JSON.parse(JSON.stringify(rawTransactions));

  const items: Transaction[] = Array.isArray(transactions?.data)
    ? transactions.data
    : [];

  return (
    <div className="">
      <div className="flex items-center mx-1 md:mx-0 justify-between">
        <h1 className="font-medium lg:text-3xl">Transactions</h1>
        <AddNewTransaction />
      </div>
      <div className="mt-10">
        {items.length === 0 ? (
          <EmptyModel />
        ) : (
          <div>
            <DataTable columns={columns} data={items} />
            <DataTableMobile />
          </div>
        )}
      </div>
    </div>
  );
}
