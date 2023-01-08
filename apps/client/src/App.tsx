import { QueryClientProvider } from "@tanstack/react-query";

import { RoomFurnitures } from "./components/RoomFurnitures";
import { trpc } from "./utils/trpc";
import { useTrpc } from "./hooks/useTrpc";

export function App() {
  const { trpcClient, queryClient } = useTrpc();

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RoomFurnitures />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
