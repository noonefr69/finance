import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Forward } from "lucide-react";
import { Budget } from "../../budgets/types/budgetsTypes";
import { ChartPieDonutText } from "../../budgets/components/ChartPieDonutText";
import { Transaction } from "../../transactions/types/transactionTypes";

export default function Budgets({
  budgets,
  transactions,
}: {
  budgets: Budget[];
  transactions: Transaction[];
}) {
  return (
    <Card className="break-inside-avoid">
      <CardHeader>
        <CardTitle>Budgets</CardTitle>
        <CardDescription>You have {budgets.length} budgets.</CardDescription>
        <CardAction>
          <Link
            href={`/budgets`}
            className="flex items-center gap-1 hover:underline"
          >
            See Details <Forward />
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent className="flex overflow-auto md:items-center gap-4 flex-col md:flex-row">
        <ChartPieDonutText
          classNameFooter="hidden "
          budgets={budgets}
          transactions={transactions}
          classNameParent={`border-none shadow-none `}
        />
        <div className="grid lg:grid-cols-1 grid-cols-2 w-full lg:self-baseline">
          {budgets
            .map((budget) => (
              <div
                key={budget._id}
                className="hover:bg-accent/50 p-2 rounded flex items-center gap-2"
              >
                <div
                  className="w-1 h-9 rounded shrink-0"
                  style={{ backgroundColor: budget.theme }}
                />
                <div>
                  <h1 className="text-muted-foreground text-sm">
                    {budget.category}
                  </h1>
                  <h2 className="font-semibold text-secondary-foreground">
                    ${budget.spend.toFixed(2)}
                  </h2>
                </div>
              </div>
            ))
            .slice(0, 6)}
        </div>
      </CardContent>
    </Card>
  );
}
