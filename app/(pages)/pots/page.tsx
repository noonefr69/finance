import AddNewPot from "./components/AddNewPot";

export default function PotsPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-medium lg:text-3xl">Pots</h1>
        <AddNewPot />
      </div>
      <div className="mt-10"></div>
    </div>
  );
}
