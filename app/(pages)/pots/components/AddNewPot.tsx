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

export default function AddNewPot() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">New pots</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">
            Are you absolutely sure?
          </DialogTitle>
          <AddNewPotForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
