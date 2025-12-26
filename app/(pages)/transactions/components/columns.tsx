"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "../types/transactionTypes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { deleteTransactionAction } from "../actions/deleteTransactionAction";
import { useState, useTransition } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "transactionName",
    header: "Recipient / Sender",
  },
  {
    accessorKey: "transactionCategory",
    header: "Category",
  },
  {
    accessorKey: "transactionDate",
    header: "Transaction Date",
    cell: ({ row }) => {
      return <span>{row.original.transactionDate.slice(0, 10)}</span>;
    },
  },
  {
    accessorKey: "transactionAmount",
    header: "Amount",
    cell: ({ row }) => {
      return (
        <span
          className={`${
            row.original.transactionAmount > 0
              ? "text-green-700"
              : "text-red-500"
          } font-semibold`}
        >
          ${Math.abs(row.original.transactionAmount).toFixed(2)}
        </span>
      );
    },
  },
  {
    id: "actions",
    // header: () => <div className="flex justify-end">Actions</div>,
    cell: ({ row }) => {
      const [isDeleteOpen, setIsDeleteOpen] = useState(false);
      const [isPending, startTransition] = useTransition();

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="space-y-1" align="end">
              <DropdownMenuItem
                className="w-full cursor-pointer"
                variant={"default"}
              >
                Edit
              </DropdownMenuItem>

              <Separator />

              <DropdownMenuItem
                onClick={() => setIsDeleteOpen(true)}
                className="w-full cursor-pointer"
                variant={"destructive"}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>

            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Delete ‘{row.original.transactionName}’?
                  </DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this pot? This action cannot
                    be reversed, and all the data inside it will be removed
                    forever.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-x-1.5 text-end">
                  <Button
                    onClick={() => {
                      startTransition(async () => {
                        try {
                          const result = await deleteTransactionAction(
                            row.original._id
                          );

                          if (result.success) {
                            setIsDeleteOpen(false);
                            toast.success(
                              `${row.original.transactionName} deleted.`
                            );
                          }
                        } catch (err) {
                          console.error(err);

                          toast.error(
                            `Something went wrong. Please try again later.`
                          );
                        }
                      });
                    }}
                    className="cursor-pointer"
                    variant={"destructive"}
                    disabled={isPending}
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
          </DropdownMenu>
        </div>
      );
    },
  },
];
