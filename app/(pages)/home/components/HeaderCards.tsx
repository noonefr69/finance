import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleAlert } from "lucide-react";

export default function HeaderCards({
  title,
  number,
  className,
}: {
  title: string;
  className?: string;
  number: number;
}) {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
  return (
    <Card className={`${className} @container`}>
      <CardHeader>
        <CardTitle
          className={`text-[clamp(1rem,4vw,1.2rem)] ${
            number < 0 ? "text-red-500" : ""
          }`}
        >
          {title}{" "}
        </CardTitle>
        <CardAction className={number < 0 ? "block" : "hidden"}>
          <Tooltip>
            <TooltipTrigger className="">
              <CircleAlert className="text-red-500"/>
            </TooltipTrigger>
            <TooltipContent className="border border-dashed">
              You reached out the limit!
            </TooltipContent>
          </Tooltip>
        </CardAction>
      </CardHeader>
      <CardContent
        className={`text-[clamp(1.5rem,3vw,1.7rem)] font-semibold ${
          number < 0 ? "text-red-500" : ""
        }`}
      >
        {formatted}
      </CardContent>
    </Card>
  );
}
