import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button, Portal, Modal } from "react-native-paper";
import { useQueryClient, useMutation } from "@tanstack/react-query";
// import Modal from "../components/Modal";

export default function AddClient() {
  const [name, setName] = React.useState({ value: "", error: "" });
  const [age, setAge] = React.useState({ value: "", error: "" });
  const [phone, setPhone] = React.useState({ value: "", error: "" });
  const [address, setAddress] = React.useState({ value: "", error: "" });
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const numberOnlyFilter = (text) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    if (numericValue.length > 3) return;
    setAge({ value: numericValue, error: "" });
  };

  const { mutateAsync: addClientAsync } = useMutation({
    mutationKey: ["clients"],
    mutationFn: async (client) => {
      return client;
    },
    onMutate: () => {
      const previousClients = queryClient.getQueryData(["client"]);

      queryClient.setQueryData(["clients"], (clients) => {
        return [
          ...clients,
          {
            name: name.value,
            age: age.value,
            phone: phone.value,
            address: address.value,
          },
        ];
      });

      return previousClients;
    },
    onSuccess: () => {
      setName({ value: "", error: "" });
      setAge({ value: "", error: "" });
      setPhone({ value: "", error: "" });
      setAddress({ value: "", error: "" });
      setIsModalOpen(true);
    },
  });

  const handleAddClient = async () => {
    if (!name.value) setName({ ...name, error: "Nome é obrigatório" });
    if (!age.value) setAge({ ...age, error: "Idade é obrigatório" });
    if (!phone.value) setPhone({ ...phone, error: "Telefone é obrigatório" });
    if (!address.value)
      setAddress({ ...address, error: "Endereço é obrigatório" });

    if (name.error || age.error || phone.error || address.error) return;

    await addClientAsync({
      name: name.value,
      age: age.value,
      phone: phone.value,
      address: address.value,
    });
  };

  return (
    <View style={styles.container}>
      <Portal>
        <Modal />
      </Portal>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome"
          label="Nome"
          returnKeyType="next"
          value={name.value}
          onChangeText={(text) => setName({ value: text, error: "" })}
          error={!!name.error}
          errorText={name.error}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite a idade"
          label="Idade"
          returnKeyType="next"
          keyboardType="numeric"
          value={age.value}
          onChangeText={numberOnlyFilter}
          error={!!age.error}
          errorText={age.error}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite o telefone"
          label="Telefone"
          returnKeyType="next"
          keyboardType="numeric"
          value={phone.value}
          onChangeText={(text) => setPhone({ value: text, error: "" })}
          error={!!phone.error}
          errorText={phone.error}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite o endereco"
          label="Endereco"
          returnKeyType="next"
          value={address.value}
          onChangeText={(text) => setAddress({ value: text, error: "" })}
          error={!!address.error}
          errorText={address.error}
        />
      </View>
      <Button buttonColor="#444f53" textColor="white" onPress={handleAddClient}>
        Cadastrar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "space-around",
    height: "100%",
  },
  input: {
    marginBottom: 20,
  },
});
