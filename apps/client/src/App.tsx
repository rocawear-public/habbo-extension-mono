import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { Outlet, RouterProvider, Link, createReactRouter, createRouteConfig } from "@tanstack/react-router";

const rootRoute = createRouteConfig({
  component: () => (
    <>
      <div>
        <Link to="/">Home</Link> <Link to="/about">About</Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
});

const indexRoute = rootRoute.createRoute({
  path: "/",
  component: RoomFurnitures,
});

const aboutRoute = rootRoute.createRoute({
  path: "/about",
  component: About,
});

function About() {
  return <div>Hello from About!</div>;
}

const routeConfig = rootRoute.addChildren([indexRoute, aboutRoute]);

const router = createReactRouter({ routeConfig });
import { RoomFurnitures } from "./components/RoomFurnitures";
import { trpc } from "./utils/trpc";
import { useTrpc } from "./hooks/useTrpc";

export function App() {
  const { trpcClient, queryClient } = useTrpc();

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <StrictMode>
          <RouterProvider router={router} />
        </StrictMode>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

declare module "@tanstack/react-router" {
  interface RegisterRouter {
    router: typeof router;
  }
}
