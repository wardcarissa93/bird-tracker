import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <KindeProvider
        audience={import.meta.env.VITE_APP_KINDE_AUDIENCE}
        clientId="0185dc0cefaa4e37b661d46b6e6d0967"
        domain="https://birdtracker.kinde.com"
        logoutUri={window.location.origin}
        redirectUri={window.location.origin}
    >
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    </KindeProvider>
  </React.StrictMode>
);