import * as React from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";
import CardClient from "@/components/CardClient";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/infra/supabase";
import CustomModal from "@/components/Modal";
import { router } from "expo-router";

export default function SelectClient() {
  const [isVisibleModal, setVisibleModal] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState("");

  const { isLoading: isLoadingClient, data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const { data, error, status } = await supabase
        .from("clients")
        .select(`id, name`);

      if (error) {
        setModalMessage("Erro ao buscar clientes");
        setVisibleModal(true);
      }

      return data;
    },
  });

  if (isLoadingClient) return <Text>Loading...</Text>;

  return (
    <>
      <CustomModal isVisible={isVisibleModal}>
        <Text>{modalMessage}</Text>
      </CustomModal>
      <ScrollView>
        {clients.map((c) => (
          <CardClient
            name={c.name}
            index={c.id}
            key={c.id}
            selectFunc={() =>
              router.navigate({
                pathname: "IMCCalculator/IMCCalculator",
                params: { clientId: c.id },
              })
            }
          />
        ))}
      </ScrollView>
    </>
  );
}
