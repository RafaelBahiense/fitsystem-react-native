import { Surface, Text } from "react-native-paper";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";

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
        <Text>{props.name}</Text>
      </Surface>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
});
