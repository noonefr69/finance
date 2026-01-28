import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pot } from "../../pots/types/potTypes";
import {
  ChevronRight,
  CircleDollarSign,
  Forward,
  MoveUpRight,
} from "lucide-react";

export default function Pots({ pots }: { pots: Pot[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pots</CardTitle>
        <CardDescription>You have {pots.length} pots.</CardDescription>
        <CardAction>
          <Link
            href={`/pots`}
            className="flex items-center gap-1 hover:underline"
          >
            See Details <Forward />
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent className="flex md:items-center gap-4 flex-col md:flex-row">
        <div className="md:w-1/2 bg-accent/50 rounded p-3 flex items-center gap-2">
          <CircleDollarSign size={50} color="green" />
          <div>
            <h2 className="font-semibold text-muted-foreground">Pots</h2>
            <h1 className="text-secondary-foreground font-semibold text-2xl">
              $
              {pots
                .reduce((a, b) => {
                  return Number(a) + b.potAmountValue;
                }, 0)
                .toFixed(2)}
            </h1>
          </div>
        </div>
        <div className="md:w-1/2 grid grid-cols-2 gap-2">
          {pots
            .map((pot) => (
              <div className="hover:bg-accent/50 p-2 rounded flex items-center gap-2">
                <div
                  className="w-1 h-9 rounded"
                  style={{ backgroundColor: pot.potTheme }}
                />
                <div>
                  <h1 className="text-muted-foreground text-sm">{pot.potName}</h1>
                  <h2 className="font-semibold text-secondary-foreground">${pot.potAmountValue.toFixed(2)}</h2>
                </div>
              </div>
            ))
            .slice(0, 4)}
        </div>
      </CardContent>
    </Card>
  );
}
