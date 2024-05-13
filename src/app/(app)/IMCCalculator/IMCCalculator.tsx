import * as React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { useMutation } from "@tanstack/react-query";
import { useLocalSearchParams, router } from "expo-router";
import Modal from "@/components/Modal";
import TextInput from "@/components/TextInput";
import GenderDropdown from "@/components/GenderDropdown";
import { numberOnlyFilter } from "@/helpers/NumberOnlyFilter";
import { supabase } from "@/infra/supabase";
import { useGetClient } from "@/hooks/useGetClient";
import { useEffect } from "react";

export default function IMCCalculator() {
  const [height, setHeight] = React.useState({ value: "", error: "" });
  const [weight, setWeight] = React.useState({ value: "", error: "" });
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState("");
  const { clientId } = useLocalSearchParams();

  useEffect(() => {
    setHeight({ value: "", error: "" });
    setWeight({ value: "", error: "" });
  }, [clientId]);

  const {
    isLoading: isLoadingClient,
    data: client,
    error,
  } = useGetClient({
    clientId: Number(clientId),
  });

  useEffect(() => {
    if (error) {
      setModalMessage("Erro ao buscar cliente");
      setIsModalOpen(true);
    }
  }, [error]);

  const { mutateAsync: addClientHealthMetricsAsync } = useMutation({
    mutationKey: ["clients-health-metrics"],
    mutationFn: async (clientHealthMetrics: ClientHealthMetrics) => {
      const { error } = await supabase
        .from("client_health_metrics")
        .insert([clientHealthMetrics]);
      if (error) {
        setModalMessage("Erro ao cadastrar medidas de saúde");
        setIsModalOpen(true);
        return false;
      }

      return true;
    },
  });

  const handleAddClientHelthMetrics = async () => {
    if (!height.value) setHeight({ ...height, error: "Altura é obrigatória" });
    if (!weight.value) setWeight({ ...weight, error: "Peso é obrigatório" });

    if (height.error || weight.error) return;

    const { data } = await supabase.auth.getUser();

    await addClientHealthMetricsAsync({
      height: height.value,
      weight: weight.value,
      client_id: Number(clientId),
      user: data.user?.id as string,
    });

    setHeight({ value: "", error: "" });
    setWeight({ value: "", error: "" });

    router.navigate({
      pathname: "/IMCCalculator/IMCResult",
      params: { clientId, height: height.value, weight: weight.value },
    });
  };

  if (isLoadingClient) return <Text>Carregando...</Text>;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <Modal visible={isModalOpen} onDismiss={() => setIsModalOpen(false)}>
        <Text>{modalMessage}</Text>
      </Modal>
      <View>
        <TextInput
          style={styles.input}
          placeholder="...Carregando"
          label="Nome"
          description={null}
          returnKeyType="next"
          value={client.name}
          errorText={null}
          disabled
        />
        <TextInput
          style={styles.input}
          placeholder="...Carregando"
          label="Idade"
          description={null}
          returnKeyType="next"
          keyboardType="numeric"
          value={client.age.toString()}
          errorText={null}
          disabled
        />
        <GenderDropdown
          style={{ marginVertical: 20 }}
          visible={false}
          value={client.gender}
          setValue={() => {}}
          showDropDown={() => {}}
          onDismiss={() => {}}
          inputProps={{
            disabled: true,
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite a altura"
          label="Altura"
          description={null}
          returnKeyType="next"
          keyboardType="numeric"
          value={height.value}
          onChangeText={(text: string) => numberOnlyFilter(text, setHeight)}
          error={!!height.error}
          errorText={height.error}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite o peso"
          label="Peso"
          description={null}
          returnKeyType="next"
          keyboardType="numeric"
          value={weight.value}
          onChangeText={(text: string) => numberOnlyFilter(text, setWeight)}
          error={!!weight.error}
          errorText={weight.error}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Button
          buttonColor="#444f53"
          textColor="white"
          onPress={handleAddClientHelthMetrics}
          style={{ marginTop: "auto", marginBottom: 40 }}
        >
          Cadastrar
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "100%",
  },
  input: {
    marginBottom: 10,
  },
});

type ClientHealthMetrics = {
  height: string;
  weight: string;
  client_id: number;
  user: string;
};
