import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { WebSocketServer } from "ws";

import { appRouter, createContext, type AppRouter } from "@habbo-extension/trpc";
import { ext } from "@habbo-extension/extension";

async function main() {
  const httpServer = createHTTPServer({
    router: appRouter,
    createContext,
  });

  const wss = new WebSocketServer({ server: httpServer.server });

  applyWSSHandler<AppRouter>({
    wss,
    router: appRouter,
    createContext,
  });

  httpServer.listen(2022);
  console.log("Server running");
  ext.run();
}

main().catch((err) => {
  console.log(err);
  process.exit(0);
});
