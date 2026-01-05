"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Edit } from "lucide-react";
import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { editUserName } from "../actions/editUserName";
import { Spinner } from "@/components/ui/spinner";

export default function EditButtonClicker({
  userName,
}: {
  userName: { name: string; _id: string };
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const editUserNameFromSchema = z.object({
    name: z
      .string()
      .min(3, "User name must be at least 5 characters.")
      .max(25, "User name must be at most 25 characters."),
  });

  const editUserNameForm = useForm<z.infer<typeof editUserNameFromSchema>>({
    resolver: zodResolver(editUserNameFromSchema),
    defaultValues: {
      name: userName.name,
    },
  });

  function onSubmit(data: z.infer<typeof editUserNameFromSchema>) {
    startTransition(async () => {
      try {
        const result = await editUserName(userName._id, data);

        if (result.success) {
          setIsEditOpen(false);
          toast.success("User name changed!");
        }
      } catch (error) {
        console.log(error);
        toast.error(`Something went wrong. Please try again later!`);
      }
    });
  }

  return (
    <>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault();
          setIsEditOpen(true);
        }}
        className="cursor-pointer"
        variant="default"
      >
        <span className="flex items-center gap-1">
          <Edit /> Edit
        </span>
      </DropdownMenuItem>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit your user name</DialogTitle>
            <DialogDescription>
              You can edit your user name whenever you want.
            </DialogDescription>
          </DialogHeader>

          <form
            id={`edit-${userName}-form`}
            onSubmit={editUserNameForm.handleSubmit(onSubmit)}
          >
            <FieldGroup>
              <Controller
                name="name"
                control={editUserNameForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-name">Name</FieldLabel>
                    <Input
                      {...field}
                      id="form-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your new user name"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
          <DialogFooter>
            <Button
              disabled={isPending}
              form={`edit-${userName}-form`}
              className="cursor-pointer w-full"
            >
              {isPending ? <Spinner /> : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
