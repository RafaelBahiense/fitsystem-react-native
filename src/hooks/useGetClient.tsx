import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { supabase } from "@/infra/supabase";
import { PostgrestError } from "@supabase/supabase-js";

export function useGetClient(props: useGetClientProps) {
  const query = useQuery({
    queryKey: ["client", props.clientId],
    queryFn: queryFn.bind(null, props.clientId),
    enabled: !!props.clientId,
    ...props,
  });

  return query;
}

async function queryFn(clientId: number) {
  const { data, error } = await supabase
    .from("clients")
    .select("id, name, age, phone, gender, address, created_at")
    .eq("id", clientId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

type useGetClientProps = Omit<
  UseQueryOptions<
    Awaited<ReturnType<typeof queryFn>>,
    PostgrestError,
    Awaited<ReturnType<typeof queryFn>>,
    ("client" | number)[]
  >,
  "queryFn" | "queryKey" | "enabled"
> & { clientId: number };
