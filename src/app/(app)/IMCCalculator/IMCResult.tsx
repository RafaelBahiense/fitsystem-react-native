import * as React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useLocalSearchParams, router } from "expo-router";
import Modal from "@/components/Modal";
import { useGetClient } from "@/hooks/useGetClient";
import { getIMC, getIMCClassification } from "@/helpers/IMCCalculator";

export default function IMCResult() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState("");
  const { clientId, height, weight } = useLocalSearchParams();

  const { isLoading: isLoadingClient, data: client } = useGetClient({
    clientId: clientId as string,
    errorFunc: () => {
      setModalMessage("Erro ao buscar cliente");
      setIsModalOpen(true);
    },
  });

  const imc = getIMC(Number(height), Number(weight));
  const classification = getIMCClassification(imc);

  if (isLoadingClient) return <Text>Carregando...</Text>;

  return (
    <View>
      <Modal visible={isModalOpen} onDismiss={() => setIsModalOpen(false)}>
        <Text>{modalMessage}</Text>
      </Modal>
      <View>
        <Text>Cliente: {client.name}</Text>
        <Text>Altura: {height}</Text>
        <Text>Peso: {weight}</Text>
        <Text>IMC: {imc}</Text>
        <Text>Classificação: {classification}</Text>
      </View>
      <View>
        <Button
          buttonColor="#444f53"
          textColor="white"
          onPress={() => router.navigate("/IMCCalculator/SelectClient")}
          style={{ width: 205, marginTop: 40 }}
        >
          Selecionar outro cliente
        </Button>
      </View>
    </View>
  );
}
