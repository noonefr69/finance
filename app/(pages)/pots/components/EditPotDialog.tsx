"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { editFormSchemaSep } from "../schemas/validationSchemas";
import { EditPotDialogProps, Pot } from "../types/potTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { POT_THEMES } from "../constants/potThemes";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function EditPotDialog({
  pot,
  isOpen,
  onOpenChange,
  onSubmit,
  isPending,
}: EditPotDialogProps) {
  const editForm = useForm<z.infer<typeof editFormSchemaSep>>({
    resolver: zodResolver(editFormSchemaSep),
    defaultValues: {
      potName: pot.potName,
      potAmount: pot.potAmount,
      potTheme: pot.potTheme,
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit '{pot.potName}'</DialogTitle>
          <DialogDescription>
            If your saving targets change, feel free to update your pots.
          </DialogDescription>
          <form
            id={`form-edit-${pot._id}`}
            className="md:mt-5"
            onSubmit={editForm.handleSubmit(onSubmit)}
          >
            <FieldGroup>
              <Controller
                name="potName"
                control={editForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`potName-${pot._id}`}>
                      New Name
                    </FieldLabel>
                    <Input
                      id={`potName-${pot._id}`}
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      placeholder="e.g. Rainy Days"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="potAmount"
                control={editForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`potAmount-${pot._id}`}>
                      New Amount
                    </FieldLabel>
                    <Input
                      id={`potAmount-${pot._id}`}
                      type="number"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const raw = e.target.value;
                        field.onChange(raw === "" ? null : Number(raw));
                      }}
                      placeholder="e.g. $2000"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="potTheme"
                control={editForm.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="vertical"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel htmlFor={`potTheme-${pot._id}`}>
                      New Theme
                    </FieldLabel>
                    <FieldContent>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id={`potTheme-${pot._id}`}
                          aria-invalid={fieldState.invalid}
                          className="w-full cursor-pointer"
                        >
                          <SelectValue
                            placeholder={field.value || "Select a theme"}
                          />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                          <SelectItem className="cursor-pointer" value="auto">
                            Auto
                          </SelectItem>
                          <SelectSeparator />
                          {POT_THEMES.map((theme) => (
                            <SelectItem
                              className="cursor-pointer"
                              key={theme}
                              value={theme}
                            >
                              <span
                                style={{ backgroundColor: theme }}
                                className={`h-3 w-3 rounded-full`}
                              ></span>
                              {theme}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
          <Button
            variant={"secondary"}
            className="cursor-pointer md:mt-7"
            type="submit"
            disabled={isPending}
            form={`form-edit-${pot._id}`}
          >
            {isPending ? <Spinner /> : "Submit"}
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
