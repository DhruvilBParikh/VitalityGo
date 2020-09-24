import React from "react";
import { View, Text } from "react-native";

export default function PersonalInformation({ navigation }) {
  return (
    <View>
      <Text onPress={() => navigation.navigate("Gender")}>Continue</Text>
    </View>
  );
}
