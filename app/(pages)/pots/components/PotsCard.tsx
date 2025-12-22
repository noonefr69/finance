"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pot } from "../types/potTypes";
import {
  addMoneySchemaSep,
  withdrawMoenySchemaSep,
} from "../schemas/validationSchemas";
import { calculatePercentage, formatCurrency } from "../utils/potUtils";
import { usePotActions } from "../hooks/usePotActions";
import EditPotDialog from "./EditPotDialog";
import DeletePotDialog from "./DeletePotDialog";
import AddMoneyPotDialog from "./AddMoneyPotDialog";
import WithdrawMoneyPotDialog from "./WithdrawMoneyPotDialog";

export default function PotsCard({ pot }: { pot: Pot }) {
  const {
    isPending,
    isEditOpen,
    setIsEditOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    isAddMoneyOpen,
    setIsAddMoneyOpen,
    isWithdrawOpen,
    setIsWithdrawOpen,
    potAmountValCl,
    setPotAmountValCl,
    potAmountValSecCl,
    setPotAmountValSecCl,
    handleDelete,
    handleEdit,
    handleAddMoney,
    handleWithdrawMoney,
  } = usePotActions(pot);

  const addMoneySchema = addMoneySchemaSep(pot);
  const withdrawMoneySchema = withdrawMoenySchemaSep(pot);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: pot.potTheme }}
          />
          {pot.potName}
        </CardTitle>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"ghost"}
                className="cursor-pointer p-1 w-3 h-6 rounded-full"
              >
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={(e) => {
                  e.preventDefault();
                  setIsEditOpen(true);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                className="cursor-pointer"
                onSelect={(e) => {
                  e.preventDefault();
                  setIsDeleteOpen(true);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-5">
          <h5 className="text-lg font-semibold ">Total Saved</h5>
          <h1 className="md:text-4xl font-semibold">
            ${formatCurrency(pot.potAmountValue)}
          </h1>
        </div>
        <div className="w-full overflow-hidden h-2 bg-accent rounded-2xl">
          <div
            className={`h-2 duration-200 transition-all`}
            style={{
              backgroundColor: pot.potTheme,
              width: `${calculatePercentage(
                pot.potAmountValue,
                pot.potAmount
              )}%`,
            }}
          ></div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <h6 className="text-muted-foreground font-semibold">{`${calculatePercentage(
            pot.potAmountValue,
            pot.potAmount
          ).toFixed(2)}%`}</h6>
          <span className="text-muted-foreground font-semibold">
            Target of ${pot.potAmount.toFixed(2)}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between mt-2 gap-4">
        <Button
          onClick={() => setIsAddMoneyOpen(true)}
          variant={"secondary"}
          className="cursor-pointer w-full shrink py-7"
        >
          Add money
        </Button>
        <Button
          onClick={() => setIsWithdrawOpen(true)}
          variant={"secondary"}
          className="cursor-pointer w-full shrink py-7"
        >
          Withdraw
        </Button>
      </CardFooter>

      {/* Dialogs */}
      <EditPotDialog
        pot={pot}
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSubmit={handleEdit}
        isPending={isPending}
      />
      <DeletePotDialog
        pot={pot}
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
        isPending={isPending}
      />
      <AddMoneyPotDialog
        pot={pot}
        isOpen={isAddMoneyOpen}
        onOpenChange={setIsAddMoneyOpen}
        onSubmit={handleAddMoney}
        isPending={isPending}
        potAmountValCl={potAmountValCl}
        setPotAmountValCl={setPotAmountValCl}
        schema={addMoneySchema}
      />
      <WithdrawMoneyPotDialog
        pot={pot}
        isOpen={isWithdrawOpen}
        onOpenChange={setIsWithdrawOpen}
        onSubmit={handleWithdrawMoney}
        isPending={isPending}
        potAmountValSecCl={potAmountValSecCl}
        setPotAmountValSecCl={setPotAmountValSecCl}
        schema={withdrawMoneySchema}
      />
    </Card>
  );
}
