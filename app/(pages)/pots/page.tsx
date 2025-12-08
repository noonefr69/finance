import AddNewPot from "./components/AddNewPot";
import PotsContainer from "./components/PotsContainer";

export default function PotsPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-medium lg:text-3xl">Pots</h1>
        <AddNewPot />
      </div>
      <div className="mt-10 grid lg:gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        <PotsContainer />
      </div>
    </div>
  );
}
