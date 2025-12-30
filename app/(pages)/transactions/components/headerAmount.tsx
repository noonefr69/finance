import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import React from "react";
import { Column } from "@tanstack/react-table";
import { Transaction } from "../types/transactionTypes";

export default function HeaderAmount({
  column,
}: {
  column: Column<Transaction, unknown>;
}) {
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
}
