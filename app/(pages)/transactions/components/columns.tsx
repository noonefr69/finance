"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "../types/transactionTypes";
import ActionDropdown from "./actionDropdown";
import AmountStyled from "./amountStyled";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "transactionName",
    header: "Recipient / Sender",
  },
  {
    accessorKey: "transactionCategory",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "transactionDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span>{row.original.transactionDate.slice(0, 10)}</span>;
    },
  },
  {
    accessorKey: "transactionAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <AmountStyled row={row.original} />;
    },
  },
  {
    id: "actions",
    // header: () => <div className="flex justify-end">Actions</div>,
    cell: ({ row }) => {
      return <ActionDropdown row={row.original} />;
    },
  },
];
