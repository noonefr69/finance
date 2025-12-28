import { Transaction } from "../types/transactionTypes";

export default function AmountStyled({ row }: { row: Transaction }) {
  return (
    <span
      className={`${
        row.transactionAmount > 0 ? "text-green-700" : "text-red-500"
      } font-semibold`}
    >
      ${Math.abs(row.transactionAmount).toFixed(2)}
    </span>
  );
}
