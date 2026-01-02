import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CardAction, CardTitle } from "@/components/ui/card";
import { Ellipsis, OctagonAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Budget } from "../types/budgetsTypes";
import { Transaction } from "../../transactions/types/transactionTypes";
import {
  isTransactionBiggerThanBudget,
  transactionsReducer,
} from "../utils/budgetUtils";

export default function BudgetCardHeader({
  budget,
  transactions,
  setIsEditOpen,
  setIsDeleteOpen,
}: {
  budget: Budget;
  transactions: Transaction[];
  setIsEditOpen: (open: boolean) => void;
  setIsDeleteOpen: (open: boolean) => void;
}) {
  return (
    <>
      <CardTitle
        className={`${isTransactionBiggerThanBudget(
          budget,
          transactions
        )} flex items-center gap-2`}
      >
        <div
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: budget.theme }}
        />
        {budget.category}
        {budget.spend - transactionsReducer(budget, transactions) < 0 ? (
          <Tooltip>
            <TooltipTrigger>
              <OctagonAlert className="text-red-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>You reached the limit.</p>
            </TooltipContent>
          </Tooltip>
        ) : null}
      </CardTitle>
      <CardAction>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="cursor-pointer">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => setIsEditOpen(true)}
              className="cursor-pointer"
              variant="default"
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setIsDeleteOpen(true)}
              className="cursor-pointer"
              variant="destructive"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardAction>
    </>
  );
}
