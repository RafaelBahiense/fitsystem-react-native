export function getIMC(height: number, weight: number): number {
  let result: number = weight / (height ** 2);
  result = Math.ceil(result * 100) / 100;
  return result;
}

export function getIMCClassification(imc: number): string {
  if (imc < 16) {
    return "Magreza grave";
  }

  if (imc < 17) {
    return "Magreza moderada";
  }

  if (imc < 18.5) {
    return "Magreza leve";
  }

  if (imc < 25) {
    return "Saudável";
  }

  if (imc < 30) {
    return "Sobrepeso";
  }

  if (imc < 35) {
    return "Obesidade Grau I";
  }

  if (imc < 40) {
    return "Obesidade Grau II";
  }

  return "Obesidade Grau III";
}
