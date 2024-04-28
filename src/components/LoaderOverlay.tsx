import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Portal, Modal } from "react-native-paper";

export default function LoaderOverlay(props: Props) {
  const { visible, onDismiss } = props;
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{ padding: 20 }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  surface: {
    minHeight: 120,
    paddingHorizontal: 8,
    paddingVertical: 5,
    margin: 5,
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
});

type Props = {
  children: React.ReactNode;
  visible: boolean;
  onDismiss: () => void;
};
