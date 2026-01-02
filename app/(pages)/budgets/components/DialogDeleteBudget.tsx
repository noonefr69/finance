import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { DialogDeleteBudgetCardProps } from "../types/budgetsTypes";

export default function DialogDeleteBudget({
  isOpen,
  setIsOpen,
  onSubmit,
  budget,
  isPending,
}: DialogDeleteBudgetCardProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {budget.category}?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this budget? This action cannot be
            reversed, and all the data inside it will be removed forever.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2 justify-end">
          <Button
            onClick={() => onSubmit()}
            disabled={isPending}
            className="cursor-pointer"
            variant={"destructive"}
          >
            {isPending ? <Spinner /> : "Yes, confirm deletion."}
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer"
            variant={"outline"}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
