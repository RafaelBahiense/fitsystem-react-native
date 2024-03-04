import { Slot } from "expo-router";
import { SessionProvider } from "../contexts/authcontext";

export default function Root() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
