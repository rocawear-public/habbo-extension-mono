import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@habbo-extension/trpc";

export const trpc = createTRPCReact<AppRouter>();
