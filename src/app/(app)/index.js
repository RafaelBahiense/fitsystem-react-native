import { Text, View, StyleSheet } from "react-native";
import CardOption from "../../components/CardOption";
import Logo from "../../components/Logo";
import { router } from "expo-router";

export default function Index() {
  return (
    <>
      <View style={styles.upperView}>
        <Logo bigger />
      </View>
      <View style={styles.lowerView}>
        <CardOption
          name={"Adicionar Cliente"}
          onPress={() => router.navigate("/AddClient")}
        />
        <CardOption
          name={"Clientes cadastrados"}
          onPress={() => router.navigate("/ListClients")}
        />
        <CardOption
          name={"Tabela IMC"}
          onPress={() => router.navigate("/IMCTable")}
        />
        <CardOption
          name={"Meus Dados"}
          onPress={() => router.navigate("/MyInfos")}
        />
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
