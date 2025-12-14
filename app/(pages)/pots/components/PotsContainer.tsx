import React from "react";
import { getPotsAction } from "../actions/getPotsAction";
import PotsCard from "./PotsCard";
import { Pot } from "../types/potTypes";

export default async function PotsContainer() {
  const rawPots = await getPotsAction();
  const pots = JSON.parse(JSON.stringify(rawPots));

  const items: Pot[] = Array.isArray(pots?.data) ? pots.data : [];

  if (items.length === 0) {
    return <div className="mt-10">No data</div>;
  }

  return (
    <div className="mt-10 grid lg:gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
      {items.map((pot) => (
        <div key={pot._id}>
          <PotsCard pot={pot} />
        </div>
      ))}
    </div>
  );
}
