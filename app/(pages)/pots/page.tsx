import NewPotDialog from "./components/NewPotDialog";
import PotsContainer from "./components/PotsContainer";

export default function PotsPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-medium lg:text-3xl">Pots</h1>
        <NewPotDialog />
      </div>
      <div>
        <PotsContainer />
      </div>
    </div>
  );
}
