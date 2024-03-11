import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Logo(props) {
  return (
    <Image
      source={require("../../assets/logo.png")}
      style={props.bigger ? styles.bigger : styles.normal}
    />
  );
}

const styles = StyleSheet.create({
  normal: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
  bigger: {
    width: 150,
    height: 150,
    marginBottom: 8,
  },
});
