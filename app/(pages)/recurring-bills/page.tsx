import { getTransactionAction } from "../transactions/actions/getTransactionAction";
import { Transaction } from "../transactions/types/transactionTypes";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { EmptyModel } from "./components/EmptyModel";
import FooterCardBills from "./components/FooterCardBills";
import HeaderCardBills from "./components/HeaderCardBills";

export default async function RecurringBills() {
  await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 second delay

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
      {data.length === 0 ? (
        <EmptyModel />
      ) : (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-9 gap-4">
          <div className="col-span-1 md:col-span-3 space-y-4">
            <HeaderCardBills data={data} />
            <FooterCardBills data={data} />
          </div>
          <div className="col-span-1 md:col-span-6">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      )}
    </div>
  );
}
