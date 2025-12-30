import AddNewBudget from "./components/AddNewBudget";

export default function BudgetsPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-medium lg:text-3xl">Budgets</h1>
        <AddNewBudget />
      </div>
      <div className="mt-10 grid md:grid-cols-9">
       
      </div>
    </div>
  );
}
