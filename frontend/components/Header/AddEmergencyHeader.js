import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AddEmergencyHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Doctor</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginLeft: -50,
  },
  title: {
    color: "#474444",
    fontSize: 22,
    fontWeight: "bold",
  },
});
