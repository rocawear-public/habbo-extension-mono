import z from "zod";

export const floorItemsSchema = z.array(z.number());
export type floorItems = z.infer<typeof floorItemsSchema>;
