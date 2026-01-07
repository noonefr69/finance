import { getTransactionAction } from "../transactions/actions/getTransactionAction";
import { Transaction } from "../transactions/types/transactionTypes";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

export default async function RecurringBills() {
  const rawTransactions = await getTransactionAction();
  const transactions = JSON.parse(JSON.stringify(rawTransactions));

  const rawData: Transaction[] = Array.isArray(transactions?.data)
    ? transactions.data
    : [];

  const data = rawData.filter((d) => d.transactionRecurring === true);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-medium lg:text-3xl">Recurring Bills</h1>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-9">
        <div className="col-span-1 md:col-span-3">
          <div>a</div>
          <div>b</div>
        </div>
        <div className="col-span-1 md:col-span-6">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}
