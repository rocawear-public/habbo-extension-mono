import { router, publicProcedure } from "../trpc";
import { observable } from "@trpc/server/observable";

export const exampleRouter = router({
  floorItems: publicProcedure.subscription(() => {
    return observable((emit) => {
      // const onNewData = (data: floorItems) => {
      //   emit.next(data);
      // };
      // ee.on("floorItems", onNewData);
      // return () => {
      //   ee.off("floorItems", onNewData);
      // };
    });
  }),
});
