import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { DeleteTransactionDialogProps } from "../types/transactionTypes";

export default function DeleteTransactionDialog({
  isOpen,
  onOpenChange,
  row,
  onConfirm,
  isPending,
}: DeleteTransactionDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete ‘{row.transactionName}’?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this transaction? This action cannot
            be reversed, and all the data inside it will be removed forever.
          </DialogDescription>
        </DialogHeader>
        <div className="space-x-1.5 text-end">
          <Button
            onClick={() => onConfirm(row)}
            className="cursor-pointer"
            variant={"destructive"}
            disabled={isPending}
          >
            {isPending ? <Spinner /> : "Yes, confirm deletion."}
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
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
