import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import AppText from "./AppText";
import colors from "../constants/Color";

function AppButton({ title, color, onPress, ...otherProps }) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color }]}
      onPress={onPress}
    >
      <AppText style={styles.text}>{title}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "60%",
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 25,
    marginTop: 25,
  },
  text: {
    color: colors.white,
    textTransform: "uppercase",
    fontWeight: "200",
    fontSize: 12,
    letterSpacing: 3,
  },
});

export default AppButton;