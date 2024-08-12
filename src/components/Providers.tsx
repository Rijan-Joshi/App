"use client";
// Importing the tRPC client that you configured in another file
import { trpc } from "@/app/_trpc/client";

// Importing QueryClient from React Query to manage query states
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Importing httpBatchLink to batch multiple HTTP requests into one to optimize network performance
import { httpBatchLink } from "@trpc/client";

// Importing types and hooks from React
import { PropsWithChildren, useState } from "react";

// Creating a Providers component that will wrap your app with necessary context providers
const Providers = ({ children }: PropsWithChildren) => {
  // Initializing a new QueryClient using React's useState hook.
  // This QueryClient will manage caching, fetching, and synchronizing data
  const [queryClient] = useState(() => new QueryClient());

  // Initializing the tRPC client using React's useState hook.
  // This client is configured with a link that points to the tRPC API endpoint.
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        // httpBatchLink batches requests made by tRPC into a single HTTP request
        // to improve performance, especially on slower networks
        httpBatchLink({
          url: "http://localhost:3000/api/trpc", // URL of your tRPC backend API
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};

export default Providers;
