import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { CreateWSSContextFnOptions } from "@trpc/server/adapters/ws";
import { type inferAsyncReturnType } from "@trpc/server";

export const createContext = (opts: CreateHTTPContextOptions | CreateWSSContextFnOptions) => {
  return {};
};
export type Context = inferAsyncReturnType<typeof createContext>;
