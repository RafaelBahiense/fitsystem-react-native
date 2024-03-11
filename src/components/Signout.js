import tw from "twrnc";
import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSession } from "../hooks/useSession";

export default function Signout() {
  const { signOut } = useSession();

  return (
    <View
      style={{
        marginRight: 15,
      }}
    >
      <AntDesign
        name="closecircleo"
        size={24}
        color="black"
        onPress={() => signOut()}
      />
    </View>
  );
}
