import * as React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, router } from "expo-router";
import Modal from "@/components/Modal";
import TextInput from "@/components/TextInput";
import GenderDropdown from "@/components/GenderDropdown";
import { numberOnlyFilter } from "@/helpers/NumberOnlyFilter";
import { supabase } from "@/infra/supabase";
import { useEditClient } from "@/hooks/useEditClient";
import { useGetClient } from "@/hooks/useGetClient";
import { Gender } from "@/entities/Gender";
import { useEffect } from "react";

export default function AddClient() {
  const [name, setName] = React.useState({ value: "", error: "" });
  const [age, setAge] = React.useState({ value: "", error: "" });
  const [gender, setGender] = React.useState({ value: "", error: "" });
  const [phone, setPhone] = React.useState({ value: "", error: "" });
  const [address, setAddress] = React.useState({ value: "", error: "" });
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState("");
  const [showDropDown, setShowDropDown] = React.useState(false);
  const queryClient = useQueryClient();
  const { clientId } = useLocalSearchParams();

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

  useEffect(() => {
    if (client) {
      setName({ value: client.name, error: "" });
      setAge({ value: String(client.age), error: "" });
      setGender({ value: client.gender, error: "" });
      setPhone({ value: client.phone, error: "" });
      setAddress({ value: client.address, error: "" });
    }
  }, [client]);

  const { mutateAsync: editClientAsync } = useEditClient({
    onError: () => {
      setModalMessage("Erro ao atualizar cliente");
      setIsModalOpen(true);
    },
    onSuccess: () => {
      setModalMessage("Cliente atualizado com sucesso");
      setIsModalOpen(true);

      queryClient.invalidateQueries("clients");
    },
  });

  const handleEditClient = async () => {
    if (!name.value) setName({ ...name, error: "Nome é obrigatório" });
    if (!age.value) setAge({ ...age, error: "Idade é obrigatório" });
    if (!gender.value) setGender({ ...gender, error: "Gênero é obrigatório" });
    if (!phone.value) setPhone({ ...phone, error: "Telefone é obrigatório" });
    if (!address.value)
      setAddress({ ...address, error: "Endereço é obrigatório" });

    if (name.error || age.error || phone.error || address.error) return;

    const { data } = await supabase.auth.getUser();

    if (!data || !data.user) {
      setModalMessage("Erro ao cadastrar cliente");
      setIsModalOpen(true);
      return;
    }

    await editClientAsync({
      id: client.id,
      name: name.value,
      age: Number(age.value),
      gender: Gender.parse(gender.value),
      phone: phone.value,
      address: address.value,
      user: data.user.id,
    });
  };

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
          placeholder="Digite o nome"
          label="Nome"
          description={null}
          returnKeyType="next"
          value={name.value}
          onChangeText={(text: string) => setName({ value: text, error: "" })}
          error={!!name.error}
          errorText={name.error}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite a idade"
          label="Idade"
          description={null}
          returnKeyType="next"
          keyboardType="numeric"
          value={age.value}
          onChangeText={(text: string) => numberOnlyFilter(text, setAge)}
          error={!!age.error}
          errorText={age.error}
        />
        <GenderDropdown
          style={{ marginBottom: 20, marginTop: 10 }}
          visible={showDropDown}
          value={gender.value}
          setValue={(value) => setGender({ value, error: "" })}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite o telefone"
          label="Telefone"
          description={null}
          returnKeyType="next"
          keyboardType="numeric"
          value={phone.value}
          onChangeText={(text: string) => setPhone({ value: text, error: "" })}
          error={!!phone.error}
          errorText={phone.error}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite o endereço"
          label="Endereço"
          description={null}
          returnKeyType="next"
          value={address.value}
          onChangeText={(text: string) =>
            setAddress({ value: text, error: "" })
          }
          error={!!address.error}
          errorText={address.error}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Button
          buttonColor="#444f53"
          textColor="white"
          onPress={() =>
            router.navigate({
              pathname: "/VisualizeClientHealthMetrics",
              params: { clientId: client.id, clientName: client.name },
            })
          }
          style={{ marginTop: "auto", marginBottom: 10 }}
        >
          Ver Métricas
        </Button>
        <Button
          buttonColor="#444f53"
          textColor="white"
          onPress={handleEditClient}
          style={{ marginTop: "auto", marginBottom: 40 }}
        >
          Atualizar
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
