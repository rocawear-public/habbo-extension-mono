import { useState } from "react";
import { trpc } from "../utils/trpc";
import type { floorItems } from "@habbo-extension/types";

export function RoomFurnitures() {
  const [floorItems, setFloorItems] = useState<floorItems>();

  trpc.example.floorItems.useSubscription(undefined, {
    onData(data) {
      console.log("received", data);
      setFloorItems(data);
    },
  });

  if (!floorItems) return <div>Loading...</div>;

  return (
    <div>
      {floorItems.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
}
