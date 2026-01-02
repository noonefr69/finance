"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "../types/transactionTypes";
import HeaderAmount from "./headerAmount";
import HeaderDate from "./headerDate";
import HeaderCategory from "./headerCategory";
import AmountStyled from "./AmountStyled";
import ActionDropdown from "./ActionDropdown";

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
      return <span>{row.original.transactionDate.slice(0, 10)}</span>;
    },
  },
  {
    accessorKey: "transactionAmount",
    header: ({ column }) => {
      return <HeaderAmount column={column} />;
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
