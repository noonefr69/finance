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
import { DataTable } from "../../recurring-bills/components/data-table";

export default function Transactions({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <Card className="break-inside-avoid">
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        <CardDescription>
          You have {transactions.length} transactions.
        </CardDescription>
        <CardAction>
          <Link
            href={`/transactions`}
            className="flex items-center gap-1 hover:underline"
          >
            See Details <Forward />
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent className="flex md:items-center gap-4 flex-col md:flex-row">
        <Table className="">
          <TableCaption className="">
            A list of your recent transactions.
          </TableCaption>
          <TableHeader>
            <TableRow className="break-all">
              <TableHead className="break-all">Recipient / Sender</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions
              .sort((a, b) => {
                return (
                  new Date(b.transactionDate).getTime() -
                  new Date(a.transactionDate).getTime()
                );
              })
              .map((t) => (
                <TableRow
                  key={t._id}
                  className="hover:bg-accent/50 transition-none break-all"
                >
                  <TableCell className="font-medium">
                    {t.transactionName}
                  </TableCell>
                  <TableCell className="">{t.transactionCategory}</TableCell>
                  <TableCell className="text-right text-green-600 font-semibold">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(t.transactionAmount)}
                  </TableCell>
                </TableRow>
              ))
              .slice(0, 6)}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
