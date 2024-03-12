import { View, Text, StyleSheet } from "react-native";

export default function IMCTable() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora do IMC</Text>

      <Text style={styles.paragraph}>
        O que é IMC{"\n"}
        {"\n"}
        Criado no século 19 pelo matemático Lambert Quételet, o Índice de Massa
        Corporal, conhecido pela sigla IMC, é um cálculo simples que permite
        medir se alguém está ou não com o peso ideal. Ele aponta se o peso está
        adequado ou se está abaixo ou acima do peso.
      </Text>

      <Text style={styles.table}>
        IMC - Classificação do IMC{"\n"}
        {"\n"}
        Menor que 16 - Magreza grave{"\n"}
        16 a menor que 17 - Magreza moderada{"\n"}
        17 a menor que 18,5 - Magreza leve{"\n"}
        18,5 a menor que 25 - Saudável{"\n"}
        25 a menor que 30 - Sobrepeso{"\n"}
        30 a menor que 35 - Obesidade Grau I{"\n"}
        35 a menor que 40 - Obesidade Grau II (considerada severa){"\n"}
        Maior que 40 - Obesidade Grau III (considerada mórbida)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  paragraph: {
    marginBottom: 20,
    textAlign: "justify",
  },
  table: {
    lineHeight: 24,
  },
});
