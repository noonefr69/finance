"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "../types/transactionTypes";
import HeaderAmount from "./headerAmount";
import HeaderDate from "./headerDate";
import HeaderCategory from "./headerCategory";
import DropwDownForActions from "./DropwDownForActions";
import StyledTheAmount from "./StyledTheAmount";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "transactionName",
    header: "Recipient / Sender",
  },
  {
    accessorKey: "transactionCategory",
    header: ({ column }) => {
      return <HeaderCategory column={column} />;
    },
  },
  {
    accessorKey: "transactionDate",
    header: ({ column }) => {
      return <HeaderDate column={column} />;
    },
    cell: ({ row }) => {
      return <span>{String(row.original.transactionDate).slice(0, 10)}</span>;
    },
  },
  {
    accessorKey: "transactionAmount",
    header: ({ column }) => {
      return <HeaderAmount column={column} />;
    },
    cell: ({ row }) => {
      return <StyledTheAmount row={row} />;
    },
  },
  {
    id: "transactionActions",
    // header: () => <div className="flex justify-end">Actions</div>,
    cell: ({ row }) => {
      return <DropwDownForActions row={row.original} />;
    },
  },
];
