"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Transaction } from "../../transactions/types/transactionTypes";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, CircleAlert, CircleCheck } from "lucide-react";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "transactionName",
    header: "Bill Title",
  },
  {
    accessorKey: "transactionDate",
    sortingFn: (rowA, rowB, columnId) => {
      const dayA = new Date(rowA.getValue(columnId)).getDate();
      const dayB = new Date(rowB.getValue(columnId)).getDate();
      return dayA - dayB;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due soon
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const today = new Date();
      const dueDate = new Date(row.original.transactionDate);

      const diffInMs = dueDate.getTime() - today.getTime();
      const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

      return (
        <div className="flex items-center gap-2">
          <h1>
            Monthly - {new Date(row.original.transactionDate).getDate()}th
          </h1>
          {diffInDays > 0 && diffInDays <= 7 ? (
            <Tooltip>
              <TooltipTrigger>
                <CircleAlert size={16} className="text-red-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {diffInDays} day{diffInDays === 1 ? null : "s"} left.
                </p>
              </TooltipContent>
            </Tooltip>
          ) : null}
          {diffInDays <= 0 && diffInDays >= -7 ? (
            <Tooltip>
              <TooltipTrigger>
                <CircleCheck size={16} className="text-green-700" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {Math.abs(Number(diffInDays)) === 0
                    ? "Today passed"
                    : Math.abs(Number(diffInDays)) + " " + "days has passed"}
                  .
                </p>
              </TooltipContent>
            </Tooltip>
          ) : null}
        </div>
      );
    },
  },
  {
    accessorKey: "transactionAmount",
    header: ({ column }) => {
      return (
        <div className=" flex justify-end">
          <Button
            variant="ghost"
            className="cursor-pointer "
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("transactionAmount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return (
        <div className="text-right font-medium text-green-700">{formatted}</div>
      );
    },
  },
];
