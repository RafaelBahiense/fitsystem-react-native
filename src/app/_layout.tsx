import { Slot } from "expo-router";
import { SessionProvider } from "../contexts/authcontext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PaperProvider } from "react-native-paper";

export default function Root() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <PaperProvider>
          <Slot />
        </PaperProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
