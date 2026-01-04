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
    <Empty className="h-[calc(100vh-15vh)] w-full col-span-9">
      <EmptyHeader className="">
        <EmptyMedia variant="icon">
          <Cloud />
        </EmptyMedia>
        <EmptyTitle>Budget Storage Empty</EmptyTitle>
        <EmptyDescription className="">
          Add budget to your budget storage to access them here.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
