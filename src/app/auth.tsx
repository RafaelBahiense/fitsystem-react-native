import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import CustomModal from "@/components/Modal";
import { useSession } from "../hooks/useSession";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  if (!email || email.length <= 0)
    return { error: true, errorMessage: "Email não pode estar vazio." };
  if (!re.test(email))
    return {
      error: true,
      errorMessage: "Ooops! Precisamos de um email válido.",
    };
  return { error: false, errorMessage: "" };
};

const passwordValidator = (password: string) => {
  if (!password || password.length <= 0)
    return { error: true, errorMessage: "Senha não pode estar vazia." };
  return { error: false, errorMessage: "" };
};

export default function SignIn() {
  const { signIn, isLoading } = useSession();
  const [email, setEmail] = useState({
    value: "",
    error: false,
    errorMessage: "",
    touched: false,
  });
  const [password, setPassword] = useState({
    value: "",
    error: false,
    errorMessage: "",
    touched: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [debouncedEmail, setDebouncedEmail] = useState("");
  const [debouncedPassword, setDebouncedPassword] = useState("");

  useEffect(() => {
    if (!email.touched) return;

    const timer = setTimeout(() => {
      const error = emailValidator(debouncedEmail);
      setEmail((current) => ({ ...current, ...error }));
    }, 500);

    return () => clearTimeout(timer);
  }, [debouncedEmail]);

  useEffect(() => {
    if (!password.touched) return;

    const timer = setTimeout(() => {
      const error = passwordValidator(debouncedPassword);
      setPassword((current) => ({ ...current, ...error }));
    }, 500);

    return () => clearTimeout(timer);
  }, [debouncedPassword]);

  const onLoginPressed = async () => {
    const emailError = email.error && email.touched;
    const passwordError = false;
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    const message = await signIn({
      email: email.value,
      password: password.value,
    });
    if (message) {
      setModalMessage(message);
      setIsModalOpen(true);
    }
  };

  return (
    <Background>
      <CustomModal
        visible={isModalOpen}
        onDismiss={() => setIsModalOpen(false)}
      >
        <Text>{modalMessage}</Text>
      </CustomModal>
      <Logo />
      <Header>Bem vindo!</Header>
      <TextInput
        label="Email"
        description={undefined}
        returnKeyType="next"
        value={email.value}
        onChangeText={(text: string) => {
          setEmail({ ...email, value: text, touched: true });
          setDebouncedEmail(text);
        }}
        error={email.error && email.touched}
        errorText={email.errorMessage}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Senha"
        description={undefined}
        returnKeyType="done"
        value={password.value}
        onChangeText={(text: string) => {
          setPassword({
            value: text,
            error: false,
            errorMessage: "",
            touched: true,
          });
          setDebouncedPassword(text);
        }}
        error={password.error}
        errorText={password.errorMessage}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onLoginPressed}
        style={undefined}
        isLoading={isLoading}
      >
        Login
      </Button>
    </Background>
  );
}
