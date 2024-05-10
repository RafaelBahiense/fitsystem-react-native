import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Button as PaperButton, ButtonProps } from "react-native-paper";
import { theme } from "../style/theme";

export default function Button({
  mode,
  style,
  isLoading,
  disabled,
  children,
  ...props
}: ButtonProps & { isLoading?: boolean }) {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === "outlined" && { backgroundColor: theme.colors.surface },
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? <ActivityIndicator color={"white"} /> : children}
    </PaperButton>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
  },
});
