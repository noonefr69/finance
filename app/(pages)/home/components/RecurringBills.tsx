import Link from "next/link";
import { columns } from "../../transactions/components/columns";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronRight,
  CircleDollarSign,
  Forward,
  MoveUpRight,
} from "lucide-react";
import { Transaction } from "../../transactions/types/transactionTypes";

export default function RecurringBills({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const realTrans = transactions.filter((t) => {
    return t.transactionRecurring === true;
  });

  const today = new Date();

  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(today.getDate() + 7);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const duaSoonData = realTrans.filter((t) => {
    const transactionDate = new Date(t.transactionDate);
    return transactionDate > today && transactionDate <= sevenDaysFromNow;
  });
  const paidBillsData = realTrans.filter((t) => {
    const transactionDate = new Date(t.transactionDate);
    return transactionDate >= sevenDaysAgo && transactionDate <= today;
  });
  const totalUpComingData = realTrans.filter((t) => {
    const transactionDate = new Date(t.transactionDate);
    return transactionDate < sevenDaysAgo || transactionDate > sevenDaysFromNow;
  });
  return (
    <Card className="break-inside-avoid">
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        <CardDescription>
          You have {realTrans.length} transactions.
        </CardDescription>
        <CardAction>
          <Link
            href={`/recurring-bills`}
            className="flex items-center gap-1 hover:underline"
          >
            See Details <Forward />
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 text-sm">
        <div className="hover:bg-accent/50 flex items-center justify-between border-l-4 rounded-l-xl p-3 border-green-700 rounded-lg">
          <h1 className="text-muted-foreground ">Paid Bills</h1>
          <h2 className="text-green-700 font-semibold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(
              paidBillsData.reduce(
                (a, b) => a + Number(b.transactionAmount),
                0,
              ),
            )}
          </h2>
        </div>
        <div className="hover:bg-accent/50 flex items-center justify-between border-l-4 rounded-l-xl p-3 border-orange-700 rounded-lg">
          <h1 className="text-muted-foreground text-sm">Total Upcoming</h1>
          <h2 className="font-semibold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(
              totalUpComingData.reduce(
                (a, b) => a + Number(b.transactionAmount),
                0,
              ),
            )}
          </h2>
        </div>
        <div className="hover:bg-accent/50 flex items-center justify-between border-l-4 rounded-l-xl p-3 border-cyan-700 rounded-lg">
          <h1 className="text-muted-foreground text-sm">Due Soon</h1>
          <h2 className="text-red-500 font-semibold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(
              duaSoonData.reduce((a, b) => a + Number(b.transactionAmount), 0),
            )}
          </h2>
        </div>
      </CardContent>
    </Card>
  );
}
