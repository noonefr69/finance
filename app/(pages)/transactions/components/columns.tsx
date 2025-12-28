"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "../types/transactionTypes";
import ActionDropdown from "./actionDropdown";
import AmountStyled from "./amountStyled";

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
