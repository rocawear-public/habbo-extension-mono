import { useMemo } from "react";
import { splitLink, createWSClient, wsLink, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { QueryClient } from "@tanstack/react-query";
import { trpc } from "../utils/trpc";

export const useTrpc = () => {
  const queryClient = useMemo(() => new QueryClient(), []);
  const trpcClient = useMemo(() => {
    const wsClient = createWSClient({ url: "ws://localhost:2022/trpc" });
    return trpc.createClient({
      links: [
        splitLink({
          condition: (op) => op.type === "subscription",
          true: wsLink({ client: wsClient }),
          false: httpBatchLink({ url: "http://localhost:2022/trpc" }),
        }),
      ],
      transformer: superjson,
    });
  }, []);

  return { queryClient, trpcClient };
};
