"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NewTransactionForm from "./NewTransactionForm";
import { useState } from "react";

export default function NewTransactionDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="cursor-pointer">
        New transaction
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
            <NewTransactionForm setIsOpen={setIsOpen}/>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
