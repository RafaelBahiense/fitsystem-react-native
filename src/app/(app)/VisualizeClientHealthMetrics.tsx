import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { useLocalSearchParams, router } from "expo-router";
import Modal from "@/components/Modal";
import { useGetClientHealthMetrics } from "@/hooks/useGetClientHealthMetrics";
import CardOption from "@/components/CardOption";
import { getIMC, getIMCClassification } from "@/helpers/IMCCalculator";
import { useEffect } from "react";

export default function IMCResult() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState("");
  const [current, setCurrent] = React.useState(0);
  const { clientId, clientName } = useLocalSearchParams();

  const {
    isLoading: isLoadingHealthMetrics,
    data,
    error,
  } = useGetClientHealthMetrics({
    clientId: Number(clientId),
  });

  useEffect(() => {
    if (error) {
      setModalMessage("Erro ao buscar cliente");
      setIsModalOpen(true);
    }
  }, [error]);

  if (isLoadingHealthMetrics) return <Text>Carregando...</Text>;

  return (
    <View style={styles.container}>
      <Modal visible={isModalOpen} onDismiss={() => setIsModalOpen(false)}>
        <Text>{modalMessage}</Text>
      </Modal>
      <View>
        <Text style={styles.clientName}>{clientName}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 20,
          }}
        >
          {data && data.length > 0 ? (
            <>
              <Button
                mode="contained"
                icon="arrow-left"
                compact={true}
                style={styles.selectEntryButton}
                buttonColor="#444f53"
                textColor="white"
                contentStyle={styles.selectEntryButtonContent}
                onPress={() => setCurrent((prev) => prev - 1)}
                disabled={current === 0}
              >
                {null}
              </Button>

              <Text style={styles.createdAt}>
                {formatDateTime(data[current].created_at)}
              </Text>
              <Button
                mode="contained"
                icon="arrow-right"
                compact={true}
                style={styles.selectEntryButton}
                buttonColor="#444f53"
                textColor="white"
                contentStyle={styles.selectEntryButtonContent}
                onPress={() => setCurrent((prev) => prev + 1)}
                disabled={current === data.length - 1}
              >
                {null}
              </Button>
            </>
          ) : null}
        </View>
        <View style={styles.cards}>
          {data && data.length > 0 ? (
            <>
              <CardOption
                name={"Altura: " + data[current].height}
                icon={"totop"}
              />
              <CardOption
                name={"Peso: " + data[current].weight}
                icon={"download"}
              />
              <CardOption
                name={
                  "IMC: " +
                  getIMC(
                    Number(data[current].height),
                    Number(data[current].weight),
                  )
                }
                icon={"form"}
              />
              <CardOption
                name={
                  "Classificação: " +
                  getIMCClassification(
                    getIMC(
                      Number(data[current].height),
                      Number(data[current].weight),
                    ),
                  )
                }
                icon={"table"}
              />
            </>
          ) : (
            <Text style={{ marginVertical: 170 }}>
              Não há dados para exibir
            </Text>
          )}
        </View>
      </View>
      <View>
        <Button
          buttonColor="#444f53"
          textColor="white"
          onPress={() =>
            router.navigate({
              pathname: "/VisualizeClient",
              params: { clientId: clientId },
            })
          }
          style={{ width: 205, marginTop: 40 }}
        >
          Voltar
        </Button>
      </View>
    </View>
  );
}

function formatDateTime(date: string) {
  const [dateStr, timeStr] = date.split("T");
  const [year, month, day] = dateStr.split("-");
  const [hour, minute, second] = timeStr.split(":");
  return `${day}/${month}/${year} ${hour}:${minute}`;
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
  createdAt: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: "auto",
  },
  selectEntryButton: {
    width: 40,
    minWidth: 40,
  },
  selectEntryButtonContent: {
    paddingLeft: 6,
  },
});
