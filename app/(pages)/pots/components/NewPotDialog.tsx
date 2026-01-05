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
import AddNewPotForm from "./AddNewPotForm";
import { useState } from "react";

export default function NewPotDialog() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="cursor-pointer">
        New pot
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="sr-only">
              Are you absolutely sure? not Showing this
            </DialogTitle>
            <AddNewPotForm setIsOpen={setIsOpen} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
