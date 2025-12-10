"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { Pot } from "../types/potTypes";
import { deletePotAction } from "../actions/deletePotAction";
import { Spinner } from "@/components/ui/spinner";

export default function PotsCard({ pot }: { pot: Pot }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function handleDelete(potId: string) {
    startTransition(async () => {
      try {
        const result = await deletePotAction(potId);

        if (!result?.success) {
          return;
        }

        setIsDeleteOpen(false);
      } catch (error) {
        console.log(error);
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
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
          <h5>Total Saved</h5>
          <span>$0.00</span>
        </div>
        <div className="w-full h-2 bg-accent" />
        <div className="flex items-center justify-between mt-2">
          <h6>0.00%</h6>
          <span>Target of {pot.potAmount}</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardFooter>

      {/* Edit dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Delete dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete ‘{pot.potName}’?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this pot? This action cannot be
              reversed, and all the data inside it will be removed forever.
            </DialogDescription>
            <div className="flex items-center gap-2 justify-end">
              <Button
                disabled={isPending}
                className="cursor-pointer lg:text-[16px] lg:py-5"
                variant={"destructive"}
                onClick={() => handleDelete(pot._id)}
              >
                {isPending ? <Spinner /> : "Yes, Confirm Deleteion."}
              </Button>
              <Button
                className="cursor-pointer lg:text-[16px] lg:py-5"
                variant={"outline"}
                onClick={() => setIsDeleteOpen(false)}
              >
                Close
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
