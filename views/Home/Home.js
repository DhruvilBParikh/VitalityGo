import React from "react";
import { View, Text } from "react-native";

export default function Home({ navigation }) {
  return (
    <View>
      <Text onPress={() => navigation.navigate("Nutrition")}>Nutrition</Text>
      <Text onPress={() => navigation.navigate("Water")}>Water</Text>
      <Text onPress={() => navigation.navigate("ECG")}>ECG</Text>
    </View>
  );
}
