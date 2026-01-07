import { ExternalLink } from "lucide-react";
import { Transaction } from "../../transactions/types/transactionTypes";
import { Budget } from "../types/budgetsTypes";
import Link from "next/link";

export default function BudgetCardFooter({
  transactions,
  budget,
}: {
  transactions: Transaction[];
  budget: Budget;
}) {
  return (
    <>
      {transactions.filter((t) => {
        return t.transactionCategory === budget.category;
      }).length === 0 ? null : (
        <>
          <div className="bg-accent opacity-80 p-2 rounded w-full">
            <div className="flex items-center justify-between mb-2">
              <h1 className="font-semibold">Latest spending</h1>
              <Link
                className="flex items-center hover:underline text-muted-foreground text-sm gap-1"
                href={`/transactions`}
              >
                See all <ExternalLink size={16} />
              </Link>
            </div>
            <div>
              {transactions
                .filter((t) => {
                  return t.transactionCategory === budget.category;
                })
                .map((t) => (
                  <div
                    key={t._id}
                    className="flex items-center justify-between mt-4 hover:bg-card rounded px-2 py-1"
                  >
                    <h1>{t.transactionName}</h1>
                    <div className="flex flex-col items-center">
                      <h2
                        className={`${
                          t.transactionAmount > 0
                            ? "text-green-700"
                            : "text-red-600"
                        } font-bold`}
                      >
                        {Math.abs(t.transactionAmount).toFixed(2)}
                      </h2>
                      <h6 className="text-muted-foreground text-[10px]">
                        {String(t.transactionDate).slice(0, 10)}
                      </h6>
                    </div>
                  </div>
                ))
                .slice(0, 3)}
            </div>
          </div>
        </>
      )}
    </>
  );
}
