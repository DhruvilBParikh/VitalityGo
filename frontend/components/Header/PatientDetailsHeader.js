import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function PatientDeatilsHeader() {
  return (
    <View style={styles.container}>
      <View />
      <View>
        <Text style={styles.title}>Patient Details</Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -15,
  },
  title: {
    color: "#474444",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: -20,
  },
});
