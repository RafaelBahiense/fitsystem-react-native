import { View, StyleSheet } from "react-native";
import { Surface, Text, Button } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

export default function CardClient(props) {
  return (
    <View>
      <Surface style={styles.surface} elevation={0}>
        <AntDesign name={"user"} size={24} color="black" />
        <Text>{props.name}</Text>
        <View style={{ justifyContent: "space-around" }}>
          <View style={{ paddingBottom: 10 }}>
            <Button buttonColor="#444f53" textColor="white">
              Editar
            </Button>
          </View>
          <Button
            buttonColor="#444f53"
            textColor="white"
            onPress={() => props.deleteFunc(props.index)}
          >
            Deletar
          </Button>
        </View>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    minHeight: 120,
    paddingHorizontal: 8,
    paddingVertical: 5,
    margin: 5,
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
});
