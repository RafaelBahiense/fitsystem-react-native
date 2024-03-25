import { Slot } from "expo-router";
import { SessionProvider } from "../contexts/authcontext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export default function Root() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </QueryClientProvider>
  );
}
