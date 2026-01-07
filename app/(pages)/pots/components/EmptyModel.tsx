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
    <Empty className="h-[calc(100vh-23vh)] w-full">
      <EmptyHeader className="">
        <EmptyMedia variant="icon">
          <Cloud />
        </EmptyMedia>
        <EmptyTitle>Pot Storage Empty</EmptyTitle>
        <EmptyDescription className="">
          Add pot to your pot storage to access them here.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
