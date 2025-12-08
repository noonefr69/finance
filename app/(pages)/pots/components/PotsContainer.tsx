import React from "react";
import { getPotsAction } from "../actions/getPotsAction";
import PotsCard from "./PotsCard";

export default async function PotsContainer() {
  const pots = await getPotsAction();
  return (
    <>
      {pots.data
        ? pots.data.map((pot) => (
            <div key={pot._id}>
              <PotsCard pot={pot} />
            </div>
          ))
        : "no data"}
    </>
  );
}
