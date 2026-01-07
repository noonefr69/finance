import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Transaction } from "../../transactions/types/transactionTypes";

export default function FooterCardBills({ data }: { data: Transaction[] }) {
  const today = new Date();

  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(today.getDate() + 7);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const duaSoonData = data.filter((t) => {
    const transactionDate = new Date(t.transactionDate);
    return transactionDate > today && transactionDate <= sevenDaysFromNow;
  });
  const paidBillsData = data.filter((t) => {
    const transactionDate = new Date(t.transactionDate);
    return transactionDate >= sevenDaysAgo && transactionDate <= today;
  });
  const totalUpComingData = data.filter((t) => {
    const transactionDate = new Date(t.transactionDate);
    return transactionDate < sevenDaysAgo || transactionDate > sevenDaysFromNow;
  });

  return (
    <Card className="bg-transparent">
      <CardHeader>
        <CardTitle className="text-lg">Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 px-2 lg:px-6">
        <div className="flex items-center justify-between gap-2 border-b hover:bg-accent/30 p-2 rounded">
          <h1 className="text-[clamp(12px,2vw,16px)] text-muted-foreground">
            Paid bills
          </h1>
          <span className="text-green-700 font-semibold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(
              paidBillsData.reduce((a, b) => a + Number(b.transactionAmount), 0)
            )}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 border-b hover:bg-accent/30 p-2 rounded">
          <h1 className="text-[clamp(12px,2vw,16px)] text-muted-foreground">
            Total Upcoming
          </h1>
          <span>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(
              totalUpComingData.reduce(
                (a, b) => a + Number(b.transactionAmount),
                0
              )
            )}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 border-b hover:bg-accent/30 p-2 rounded">
          <h1 className="text-[clamp(12px,2vw,16px)] text-muted-foreground">
            Due Soon
          </h1>
          <span className="text-red-500 font-semibold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(
              duaSoonData.reduce((a, b) => a + Number(b.transactionAmount), 0)
            )}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
