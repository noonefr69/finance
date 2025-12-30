import { Button } from "@/components/ui/button";
import { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Transaction } from "../types/transactionTypes";

export default function HeaderDate({
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
      Date
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
