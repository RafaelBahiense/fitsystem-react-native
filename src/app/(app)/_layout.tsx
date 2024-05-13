import { Redirect } from "expo-router";
import { useSession } from "../../hooks/useSession";
import SingOut from "../../components/Signout";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function AppLayout() {
  const { session } = useSession();

  if (!session) {
    return <Redirect href="/auth" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerRight: () => <SingOut />,
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "Home",
          }}
        />
        <Drawer.Screen
          name="AddClient"
          options={{
            drawerLabel: "Adicionar Cliente",
            title: "Adicionar Cliente",
          }}
        />
        <Drawer.Screen
          name="ListClients"
          options={{
            drawerLabel: "Listar Clientes",
            title: "Listar Clientes",
          }}
        />
        <Drawer.Screen
          name="IMCCalculator/IMCTable"
          options={{
            drawerLabel: "Calculadora IMC",
            title: "Calculadora IMC",
          }}
        />
        <Drawer.Screen
          name="MyInfos"
          options={{
            drawerLabel: "Meus Dados",
            title: "Meus Dados",
          }}
        />
        <Drawer.Screen
          name="IMCCalculator/SelectClient"
          options={{
            drawerLabel: "",
            title: "Selecionar Cliente",
            drawerItemStyle: {
              display: "none",
            },
          }}
        />
        <Drawer.Screen
          name="IMCCalculator/IMCCalculator"
          options={{
            drawerLabel: "",
            title: "Calculadora",
            drawerItemStyle: {
              display: "none",
            },
          }}
        />
        <Drawer.Screen
          name="IMCCalculator/IMCResult"
          options={{
            drawerLabel: "",
            title: "Resultado IMC",
            drawerItemStyle: {
              display: "none",
            },
          }}
        />
        <Drawer.Screen
          name="VisualizeClient"
          options={{
            drawerLabel: "",
            title: "Visualizar Cliente",
            drawerItemStyle: {
              display: "none",
            },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
