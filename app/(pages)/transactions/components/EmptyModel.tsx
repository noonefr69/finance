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

export function EmptyModel() {
  return (
    <Empty className="h-[calc(100vh-15vh)] ">
      <EmptyHeader className="">
        <EmptyMedia variant="icon">
          <Cloud />
        </EmptyMedia>
        <EmptyTitle>Transaction Storage Empty</EmptyTitle>
        <EmptyDescription className="">
          Add transaction to your transaction storage to access them here.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
