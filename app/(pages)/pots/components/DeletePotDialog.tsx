"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { DeletePotDialogProps } from "../types/potTypes";

export default function DeletePotDialog({
  pot,
  isOpen,
  onOpenChange,
  onConfirm,
  isPending,
}: DeletePotDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete '{pot.potName}'</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this pot? This action cannot be
            reversed, and all the data inside it will be removed forever.
          </DialogDescription>
          <div className="flex items-center gap-2 justify-end">
            <Button
              disabled={isPending}
              className="cursor-pointer lg:text-[16px] lg:py-5"
              variant={"destructive"}
              onClick={() => onConfirm(pot._id)}
            >
              {isPending ? <Spinner /> : "Yes, Confirm Deletion"}
            </Button>
            <Button
              className="cursor-pointer lg:text-[16px] lg:py-5"
              variant={"outline"}
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
