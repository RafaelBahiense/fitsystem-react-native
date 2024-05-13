import { View, StyleSheet } from "react-native";
import { Surface, Text, Button } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

export default function CardClient(props: Props) {
  return (
    <View>
      <Surface style={styles.surface} elevation={0}>
        <AntDesign name={"user"} size={24} color="black" />
        <Text>{props.name}</Text>
        <View style={{ justifyContent: "space-around" }}>
          {props.visualizeFunc ? (
            <View style={{ paddingBottom: 10 }}>
              <Button
                buttonColor="#444f53"
                textColor="white"
                onPress={() => props.visualizeFunc(props.index)}
              >
                Ver
              </Button>
            </View>
          ) : null}
          {props.deleteFunc ? (
            <View>
              <Button
                buttonColor="#444f53"
                textColor="white"
                onPress={() => props.deleteFunc(props.index)}
              >
                Deletar
              </Button>
            </View>
          ) : null}
          {props.selectFunc ? (
            <View>
              <Button
                buttonColor="#444f53"
                textColor="white"
                onPress={() => props.selectFunc(props.index)}
              >
                Selecionar
              </Button>
            </View>
          ) : null}
        </View>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    minHeight: 120,
    paddingHorizontal: 20,
    paddingVertical: 5,
    margin: 5,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
});

type Props = {
  name: string;
  index: number;
  deleteFunc?: (id: number) => void;
  visualizeFunc?: (id: number) => void;
  selectFunc?: (id: number) => void;
};
