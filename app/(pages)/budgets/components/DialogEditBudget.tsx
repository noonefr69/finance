import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteBudgetAction } from "../actions/deleteBudgetAction";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TRANSACTION_CATEGORY } from "../../transactions/constants/transactionCategory";
import { Input } from "@/components/ui/input";
import { POT_THEMES } from "../../pots/constants/potThemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { editBudgetFormSchema } from "../schema/validationSchemas";
import z from "zod";
import { editBudgetAction } from "../actions/editBudgetAction";
import { Button } from "@/components/ui/button";
import { DialogEditBudgetProps } from "../types/budgetsTypes";

export default function DialogEditBudget({
  form,
  isPending,
  isOpen,
  setIsOpen,
  budget,
  onSubmit,
}: DialogEditBudgetProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {budget.category}?</DialogTitle>
          <DialogDescription>
            As your budgets change, feel free to update your spending limits.
          </DialogDescription>
        </DialogHeader>
        <form id="editBudgetform" onSubmit={form.handleSubmit(onSubmit)}>
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
                  <FieldLabel htmlFor={`category-${budget._id}`}>
                    Category
                  </FieldLabel>
                  <FieldContent>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id={`category-${budget._id}`}
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
                        {TRANSACTION_CATEGORY.map((theme) => (
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
                      field.onChange(value === "" ? "" : Number(value));
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
                  <FieldLabel htmlFor={`theme-${budget._id}`}>Theme</FieldLabel>
                  <FieldContent>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id={`theme-${budget._id}`}
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
        <Button
          disabled={isPending}
          form="editBudgetform"
          className="cursor-pointer"
        >
          {isPending ? <Spinner /> : "Submit"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
