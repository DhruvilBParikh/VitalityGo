import React from "react";
import { View, Text } from "react-native";

export default function ProfilePictureFemale({ navigation }) {
  return (
    <View>
      <Text onPress={() => navigation.navigate("Home")}>Continue</Text>
    </View>
  );
}
