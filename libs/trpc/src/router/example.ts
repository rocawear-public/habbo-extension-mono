import { router, publicProcedure } from "../trpc";
import { observable } from "@trpc/server/observable";
import type { floorItems } from "@habbo-extension/types";
import { events } from "@habbo-extension/extension";

export const exampleRouter = router({
  floorItems: publicProcedure.subscription(() => {
    return observable<floorItems>((emit) => {
      const onFloorItems = (data: floorItems) => {
        emit.next(data);
      };
      events.on("floorItems", onFloorItems);

      return () => {
        events.off("floorItems", onFloorItems);
      };
    });
  }),
});
