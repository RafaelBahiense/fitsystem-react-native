import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { supabase } from "@/infra/supabase";
import { PostgrestError } from "@supabase/supabase-js";

export function useGetClientHealthMetrics(props: useAddClientProps) {
  const query = useQuery({
    queryKey: ["client_health_metrics", props.clientId],
    queryFn: queryFn.bind(null, props.clientId),
    enabled: !!props.clientId,
    ...props,
  });

  return query;
}

async function queryFn(clientId: number) {
  const { data, error } = await supabase
    .from("client_health_metrics")
    .select("id, height, weight, created_at")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

type useAddClientProps = Omit<
  UseQueryOptions<
    Awaited<ReturnType<typeof queryFn>>,
    PostgrestError,
    Awaited<ReturnType<typeof queryFn>>,
    ("client_health_metrics" | number)[]
  >,
  "queryFn" | "queryKey" | "enabled"
> & { clientId: number };
