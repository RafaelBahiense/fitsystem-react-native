import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { supabase } from "@/infra/supabase";
import { PostgrestError } from "@supabase/supabase-js";
import { Client } from "@/entities/Client";

export function useAddClient(props: useAddClientProps) {
  const mutation = useMutation({
    mutationKey: ["clients"],
    mutationFn,
    ...props,
  });
  return mutation;
}

async function mutationFn(client: Client) {
  const { error } = await supabase.from("clients").insert([client]);
  if (error) {
    throw error;
  }
}

type useAddClientProps = Omit<
  UseMutationOptions<
    Awaited<ReturnType<typeof mutationFn>>,
    PostgrestError,
    Client
  >,
  "mutationFn" | "mutationKey"
>;
