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

export function EmptyModel({ className }: { className?: string }) {
  return (
    <Empty className={`h-[calc(100vh-23vh)] ${className}`}>
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
