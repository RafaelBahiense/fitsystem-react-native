import React, { useState } from "react";
import { router } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../infra/supabase";
import { detectReason, getReasonMessage } from "@/helpers/ErrorMapper";

export const AuthContext = React.createContext({} as AuthContextType);

async function signIn(credentials: Credentials) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });

  return { data, error };
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>();

  const queryClient = useQueryClient();
  const useSignIn = useMutation({
    mutationKey: ["auth"],
    mutationFn: signIn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setSession(data?.data?.session);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        signIn: async ({ email, password }) => {
          const { error } = await useSignIn.mutateAsync({
            email,
            password,
          });

          if (error) {
            const reason = detectReason(error);
            const reasonFeedback = getReasonMessage(reason);
            return reasonFeedback;
          }

          router.replace("/");

          return null;
        },
        signOut: async () => {
          await supabase.auth.signOut();
          setSession(null);
        },
        session,
        isPending: useSignIn.isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

type Credentials = { email: string; password: string };

type AuthContextType = {
  signIn: (credentials: Credentials) => Promise<string | null>;
  signOut: () => Promise<void>;
  session?: Session | null;
  isPending: boolean;
};
