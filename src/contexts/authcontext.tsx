import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

async function signUp(credentials: Credentials) {
  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
  });

  return { data, error };
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<string | undefined>();
  const queryClient = useQueryClient();
  const useSignIn = useMutation({
    mutationKey: ["auth"],
    mutationFn: signIn,
    onSuccess: () => {
      queryClient.invalidateQueries("profile");
    },
  });
  // const useSignUp = useMutation({
  //   mutationKey: ["auth"],
  //   mutationFn: signUp,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("profile");
  //   },
  // });
  //
  useEffect(() => {
    console.log("useSignIn", useSignIn);
    if (useSignIn.data?.data.session) {
      setSession(useSignIn.data.data.session?.access_token);
    }
  }, [useSignIn]);

  return (
    <AuthContext.Provider
      value={{
        signIn: async ({ email, password }) => {
          const { error } = await useSignIn.mutateAsync({ email, password });
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
        },
        // signUp: async ({ email, password }) => {
        //   const { error } = await useSignUp.mutateAsync({ email, password });
        //   if (error) {
        //     Alert.alert(error.message);
        //     return;
        //   }
        // },
        useSignInIsLoading: useSignIn.isPending,
        session: session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

type Credentials = { email: string; password: string };

type AuthContextType = {
  signIn: (credentials: Credentials) => Promise<string | null>;
  /* signUp: (credentials: Credentials) => Promise<string>; */
  signOut: () => Promise<void>;
  useSignInIsLoading: boolean;
  session: string | undefined;
};
