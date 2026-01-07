import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useTransactionAction } from "../hooks/useTransactionAction";
import DeleteTransactionDialog from "./DeleteTransactionDialog";
import EditTransactionDialog from "./EditTransactionDialog";
import { Transaction } from "../types/transactionTypes";

export default function DropwDownForActions({ row }: { row: Transaction }) {
  const {
    isDeleteOpen,
    setIsDeleteOpen,
    isEditOpen,
    setIsEditOpen,
    isPending,
    handledelet,
    handleEdit,
  } = useTransactionAction(row._id);

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="space-y-1" align="end">
          <DropdownMenuItem
            className="w-full cursor-pointer"
            variant={"default"}
            onClick={() => setIsEditOpen(true)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setIsDeleteOpen(true)}
            className="w-full cursor-pointer"
            variant={"destructive"}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>

        <DeleteTransactionDialog
          isOpen={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          row={row}
          isPending={isPending}
          onConfirm={handledelet}
        />

        <EditTransactionDialog
          isOpen={isEditOpen}
          onOpenChange={setIsEditOpen}
          isPending={isPending}
          onSubmit={handleEdit}
          row={row}
        />
      </DropdownMenu>
    </div>
  );
}
