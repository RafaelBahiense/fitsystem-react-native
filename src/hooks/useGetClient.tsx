import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/infra/supabase";

export function useGetClient({ clientId, errorFunc }: useGetClientProps) {
  const query = useQuery({
    queryKey: ["client", clientId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("id, name, age, gender")
        .eq("id", clientId)
        .single();

      if (error) {
        errorFunc(error);
      }

      return data;
    },
    enabled: !!clientId,
  });

  return query;
}

interface useGetClientProps {
  clientId: string;
  errorFunc: (error?: any) => void;
}
