import * as React from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";
import CardClient from "../../components/CardClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../infra/supabase";
import CustomModal from "@/components/Modal";

export default function ListClients() {
  const [isVisibleModal, setVisibleModal] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState("");

  const queryClient = useQueryClient();

  const { isLoading: isLoadingClient, data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const { data, error, status } = await supabase
        .from("clients")
        .select(`*`);

      if (error) {
        setModalMessage("Erro ao buscar clientes");
        setVisibleModal(true);
      }

      return data;
    },
  });

  const { isPending: isPendingDeleteClient, mutateAsync: deleteClientAsync } =
    useMutation({
      mutationKey: ["clients"],
      mutationFn: async (id) => {
        console.log("id", id);
        const { error } = await supabase.from("clients").delete().match({ id });
        console.log("error", error);

        if (error) {
          setModalMessage("Erro ao deletar cliente");
        } else {
          queryClient.invalidateQueries("clients");
          console.log("client deleted");
          setModalMessage("Cliente deletado com sucesso");
        }

        setVisibleModal(true);
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
            deleteFunc={deleteClientAsync}
          />
        ))}
      </ScrollView>
    </>
  );
}
