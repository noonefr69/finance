import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReceiptText } from "lucide-react";
import { Transaction } from "../../transactions/types/transactionTypes";

export default function HeaderCardBills({ data }: { data: Transaction[] }) {
  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle>
          <ReceiptText size={30} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-[clamp(1.35rem,4vw,1.5rem)] font-semibold">
          Total bills
        </p>
      </CardContent>
      <CardFooter>
        <p className="text-[clamp(1.25rem,3vw,1.5rem)] whitespace-normal font-semibold">
          $
          {data
            .reduce((a, b) => {
              return a + Number(b.transactionAmount);
            }, 0)
            .toFixed(2)}
        </p>
      </CardFooter>
    </Card>
  );
}
