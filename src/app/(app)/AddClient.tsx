import * as React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { useQueryClient } from "@tanstack/react-query";
import Modal from "@/components/Modal";
import TextInput from "@/components/TextInput";
import GenderDropdown from "@/components/GenderDropdown";
import { numberOnlyFilter } from "@/helpers/NumberOnlyFilter";
import { supabase } from "@/infra/supabase";
import { useAddClient } from "@/hooks/useAddClient";
import { Gender } from "@/entities/Gender";

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

  const { mutateAsync: addClientAsync } = useAddClient({
    onError: () => {
      setModalMessage("Erro ao cadastrar cliente");
      setIsModalOpen(true);
    },
    onSuccess: () => {
      setName({ value: "", error: "" });
      setAge({ value: "", error: "" });
      setGender({ value: "", error: "" });
      setPhone({ value: "", error: "" });
      setAddress({ value: "", error: "" });

      setModalMessage("Cliente cadastrado com sucesso");
      setIsModalOpen(true);

      queryClient.invalidateQueries("clients");
    },
  });

  const handleAddClient = async () => {
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

    await addClientAsync({
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
          onPress={handleAddClient}
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
