import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { useLocalSearchParams, router } from "expo-router";
import Modal from "@/components/Modal";
import { useGetClient } from "@/hooks/useGetClient";
import CardOption from "@/components/CardOption";
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
    <View style={styles.container}>
      <Modal visible={isModalOpen} onDismiss={() => setIsModalOpen(false)}>
        <Text>{modalMessage}</Text>
      </Modal>
      <View>
        <Text style={styles.clientName}>{client.name}</Text>
        <View style={styles.cards}>
          <CardOption name={"Altura: " + height} icon={"totop"} />
          <CardOption name={"Peso: " + weight} icon={"download"} />
          <CardOption name={"IMC: " + imc} icon={"form"} />
          <CardOption
            name={"Classificação: " + classification}
            icon={"table"}
          />
        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    paddingVertical: 5,
  },
  clientName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 60,
    textAlign: "center",
  },
});
