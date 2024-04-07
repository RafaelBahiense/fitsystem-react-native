import React from "react";
import { StyleSheet } from "react-native";
import { Portal, Modal, Surface } from "react-native-paper";

export default function CustomModal(props: Props) {
  const { children, visible, onDismiss } = props;
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{ padding: 20 }}
      >
        <Surface style={styles.surface}>{children}</Surface>
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
