import * as React from "react";
import { View, ScrollView, StyleSheet, Platform } from "react-native";
import { Text, Button } from "react-native-paper";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import Modal from "../../components/Modal";
import TextInput from "../../components/TextInput";
import Dropdown from "../../components/Dropdown";
import { supabase } from "../../infra/supabase";

const genderList = [
  {
    label: "Masculino",
    value: "Male",
  },
  {
    label: "Feminino",
    value: "Female",
  },
  {
    label: "Outro",
    value: "Other",
  },
];

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

  const numberOnlyFilter = (text) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    if (numericValue.length > 3) return;
    setAge({ value: numericValue, error: "" });
  };

  const { mutateAsync: addClientAsync } = useMutation({
    mutationKey: ["clients"],
    mutationFn: async (client) => {
      const { error } = await supabase.from("clients").insert([client]);
      if (error) {
        setModalMessage("Erro ao cadastrar cliente");
        setIsModalOpen(true);
        return false;
      }

      setModalMessage("Cliente cadastrado com sucesso");
      setIsModalOpen(true);

      queryClient.invalidateQueries("clients");

      return true;
    },
    onMutate: () => {},
    onSuccess: () => {
      setName({ value: "", error: "" });
      setAge({ value: "", error: "" });
      setGender({ value: "", error: "" });
      setPhone({ value: "", error: "" });
      setAddress({ value: "", error: "" });
      setIsModalOpen(true);
    },
  });

  const handleAddClient = async () => {
    if (!name.value) setName({ ...name, error: "Nome é obrigatório" });
    if (!age.value) setAge({ ...age, error: "Idade é obrigatório" });
    if (!gender.value)
      setGender({ ...gender.value, error: "Gênero é obrigatório" });
    if (!phone.value) setPhone({ ...phone, error: "Telefone é obrigatório" });
    if (!address.value)
      setAddress({ ...address, error: "Endereço é obrigatório" });

    if (name.error || age.error || phone.error || address.error) return;

    const { data } = await supabase.auth.getUser();

    await addClientAsync({
      name: name.value,
      age: age.value,
      gender: gender.value,
      phone: phone.value,
      address: address.value,
      user: data.user.id,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Modal visible={isModalOpen} onDismiss={() => setIsModalOpen(false)}>
        <Text>{modalMessage}</Text>
      </Modal>
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
        <Dropdown
          style={{ marginVertical: 20 }}
          placeholder="Selecione o gênero"
          label="Gênero"
          visible={showDropDown}
          list={genderList}
          value={gender.value}
          setValue={(value) => setGender({ value, error: "" })}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
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
      <Button
        buttonColor="#444f53"
        textColor="white"
        onPress={handleAddClient}
        style={{ marginTop: "auto", marginBottom: 40 }}
      >
        Cadastrar
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    height: "100%",
  },
  input: {
    marginBottom: 10,
  },
});
