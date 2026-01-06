import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { CreateNewBudgetDialogProps } from "../types/budgetsTypes";
import { CATEGORY } from "../../../constants/category";
import { THEMES } from "../../../constants/themes";

export default function DialogAddNewBudget({
  isOpen,
  setIsOpen,
  form,
  isPending,
  onSubmit,
}: CreateNewBudgetDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Budget</DialogTitle>
          <DialogDescription>
            Choose a category to set a spending budget. These categories can
            help you monitor spending.
          </DialogDescription>
          <form id="newBudgetform" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="category"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="vertical"
                    data-invalid={fieldState.invalid}
                    className="mt-2"
                  >
                    <FieldLabel htmlFor="category">Category</FieldLabel>
                    <FieldContent>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="category"
                          aria-invalid={fieldState.invalid}
                          className="w-full cursor-pointer"
                        >
                          <SelectValue
                            placeholder={field.value || "Select a category"}
                          />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                          <SelectItem className="cursor-pointer" value="auto">
                            Auto
                          </SelectItem>
                          <SelectSeparator />
                          {CATEGORY.map((theme) => (
                            <SelectItem
                              className="cursor-pointer"
                              key={theme}
                              value={theme}
                            >
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
              <Controller
                name="spend"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Maximum Spend</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. $2000"
                      type="number"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(
                          value === "" ? undefined : Number(value)
                        );
                      }}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="theme"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="vertical"
                    data-invalid={fieldState.invalid}
                    className=""
                  >
                    <FieldLabel htmlFor="theme">Theme</FieldLabel>
                    <FieldContent>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="theme"
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
                          {THEMES.map((theme) => (
                            <SelectItem
                              className="cursor-pointer"
                              key={theme}
                              value={theme}
                            >
                              <div
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: theme }}
                              />
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
          <DialogFooter>
            <Button
              disabled={isPending}
              form="newBudgetform"
              className="w-full cursor-pointer mt-4"
            >
              {isPending ? <Spinner /> : "Submit"}
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
