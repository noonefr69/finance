import { Row } from "@tanstack/react-table";
import { Transaction } from "../types/transactionTypes";

export default function AmountStyled({ row }: { row: Row<Transaction> }) {
  const amount = parseFloat(row.getValue("transactionAmount"));
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
  return (
    <span
      className={`${
        row.original.transactionAmount > 0 ? "text-green-700" : "text-red-500"
      } font-semibold`}
    >
      {formatted}
    </span>
  );
}
