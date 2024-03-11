import { Text, View, StyleSheet } from "react-native";
import CardOption from "../../components/CardOption";
import Logo from "../../components/Logo";

export default function Index() {
  return (
    <>
      <View style={styles.upperView}>
        <Logo bigger />
      </View>
      <View style={styles.lowerView}>
        <CardOption name={"Adicionar Cliente"} />
        <CardOption name={"Clientes cadastrados"} />
        <CardOption name={"Tabela IMC"} />
        <CardOption name={"Meus Dados"} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  upperView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  lowerView: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    paddingVertical: 5,
  },
});
