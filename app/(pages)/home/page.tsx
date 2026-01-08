import Budgets from "./components/Budgets";
import HeaderCardsHome from "./components/HeaderCardsHome";
import Pots from "./components/Pots";
import RecurringBills from "./components/RecurringBills";
import Transactions from "./components/Transactions";

export default function Home() {
  return (
    <div className="">
      <HeaderCardsHome />
      <div className="grid lg:grid-cols-2 gap-4 mt-10">
        <Pots />
        <Budgets />
        <Transactions />
        <RecurringBills />
      </div>
    </div>
  );
}
