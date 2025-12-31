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

export default function NewPotDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">New pot</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">
            Are you absolutely sure? not Showing this
          </DialogTitle>
          <AddNewPotForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
