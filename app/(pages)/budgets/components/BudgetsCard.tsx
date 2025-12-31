"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Budget } from "../types/budgetsTypes";
import { Transaction } from "../../transactions/types/transactionTypes";
import { Button } from "@/components/ui/button";
import { Ellipsis, ExternalLink } from "lucide-react";
import { useState, useTransition } from "react";
import Link from "next/link";
import { deleteBudgetAction } from "../actions/deleteBudgetAction";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
export default function BudgetsCard({
  budget,
  transactions,
}: {
  budget: Budget;
  transactions: Transaction[];
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: budget.theme }}
          />
          {budget.category}
        </CardTitle>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} className="cursor-pointer">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => setIsEditOpen(true)}
                className="cursor-pointer"
                variant="default"
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setIsDeleteOpen(true)}
                className="cursor-pointer"
                variant="destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
      <CardContent>
        <h3 className="text-muted-foreground mb-2">
          Maximum of ${budget.spend.toFixed(2)}
        </h3>
        <div className="bg-accent w-full h-8 rounded-sm flex items-center px-1 mb-2">
          <div
            style={{ backgroundColor: budget.theme }}
            className="h-6 w-1/2 rounded-sm"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 md:w-1/2 p-2 hover:bg-accent duration-200 rounded">
            <div
              className="h-10 w-1 rounded"
              style={{ backgroundColor: budget.theme }}
            />
            <div className=" gap-2">
              <h6 className="text-sm text-muted-foreground">Spent</h6>
              <h2 className="font-semibold">${"100.00"}</h2>
            </div>
          </div>
          <div className="flex items-center gap-4 md:w-1/2 p-2 hover:bg-accent duration-200 rounded">
            <div
              className="h-10 w-1 rounded opacity-20"
              style={{ backgroundColor: `${budget.theme}` }}
            />
            <div className=" gap-2">
              <h6 className="text-sm text-muted-foreground">Free</h6>
              <h2 className="font-semibold">${"100.00"}</h2>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardFooter>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {budget.category}?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this budget? This action cannot be
              reversed, and all the data inside it will be removed forever.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2 justify-end">
            <Button
              onClick={() => {
                startTransition(async () => {
                  try {
                    const result = await deleteBudgetAction(budget._id);
                    if (result.success) {
                      setIsDeleteOpen(false);
                      toast.success(`${budget.category} deleted!`);
                    }
                  } catch (err) {
                    console.error(err);
                    toast.error(
                      `Something went wrong. please try again later!`
                    );
                  }
                });
              }}
              disabled={isPending}
              className="cursor-pointer"
              variant={"destructive"}
            >
              {isPending ? <Spinner /> : "Yes, confirm deletion."}
            </Button>
            <Button
              onClick={() => setIsDeleteOpen(false)}
              className="cursor-pointer"
              variant={"outline"}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
