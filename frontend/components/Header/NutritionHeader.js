import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function NutritionHeader() {
  return (
    <View style={styles.container}>
      <View />
      <View>
        <Text style={styles.title}>Nutrition</Text>
      </View>
      {/* <TouchableOpacity activeOpacity={0.7}>
        <Image source={require("../../assets/images/add-button.png")} />
      </TouchableOpacity> */}
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
