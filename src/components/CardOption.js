import { Surface, Text } from "react-native-paper";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function CardOption(props) {
  const { width } = Dimensions.get("window");

  return (
    <TouchableOpacity onPress={props.onPress}>
      <Surface
        style={{
          ...styles.surface,
          width: width / 2 - 10,
          height: width / 2 - 10,
        }}
        elevation={0}
      >
        <AntDesign name={props.icon} size={24} color="black" />
        <Text>{props.name}</Text>
      </Surface>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  surface: {
    paddingHorizontal: 8,
    paddingVertical: 18,
    margin: 5,
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
});
