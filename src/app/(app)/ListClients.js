import * as React from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";
import CardClient from "../../components/CardClient";
import { useQuery, useMutation } from "@tanstack/react-query";

export default function ListClients() {
  const {
    isPending: isPendingClient,
    error: errorGetClient,
    data: clients,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const data = [];

      for (let i = 0; i < 10; i++) {
        data.push({
          name: Math.random().toString(36).substring(2, 9),
        });
      }

      return data;
    },
  });

  const {
    isPending: isPendingDeleteClient,
    mutateAsync: deleteClientAsync,
    error: errorDeleteClient,
  } = useMutation({
    mutationFn: async (index) => {
      clients.splice(index, 1);
    },
  });

  if (isPendingClient) return <Text>Loading...</Text>;

  return (
    <ScrollView>
      {clients.map((c, i) => (
        <CardClient
          name={c.name}
          index={i}
          key={i}
          deleteFunc={deleteClientAsync}
        />
      ))}
    </ScrollView>
  );
}
