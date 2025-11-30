import Budgets from "./components/Budgets";
import Header from "./components/Header";
import Pots from "./components/Pots";
import RecurringBills from "./components/RecurringBills";
import Transactions from "./components/Transactions";

export default function Home() {
  return (
    <div className="">
      <Header />
      <div className="grid lg:grid-cols-2 gap-4">
        <Pots />
        <Budgets />
        <Transactions />
        <RecurringBills />
      </div>
    </div>
  );
}
