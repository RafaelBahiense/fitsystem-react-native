import { Redirect } from "expo-router";
import { Text } from "react-native";
import { useSession } from "../../hooks/useSession";
import Singout from "../../components/Signout";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerRight: () => <Singout />,
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
          name="IMCTable"
          options={{
            drawerLabel: "Tabela IMC",
            title: "Tabela IMC",
          }}
        />
        <Drawer.Screen
          name="MyInfos"
          options={{
            drawerLabel: "Meus Dados",
            title: "Meus Dados",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
