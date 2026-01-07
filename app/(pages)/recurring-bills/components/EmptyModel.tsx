import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Cloud } from "lucide-react";
import Link from "next/link";

export function EmptyModel() {
  return (
    <Empty className="h-[calc(100vh-23vh)] w-full">
      <EmptyHeader className="">
        <EmptyMedia variant="icon">
          <Cloud />
        </EmptyMedia>
        <EmptyTitle>Recurring Bills Storage Empty</EmptyTitle>
        <EmptyDescription className="">
          Add <Link href={`/transactions`}>transaction</Link> to your pot
          storage to access them here.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
