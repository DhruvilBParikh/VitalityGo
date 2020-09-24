import React from "react";
import { View, Text } from "react-native";

export default function GetStarted({ navigation }) {
  return (
    <View>
      <Text onPress={() => navigation.navigate("UserType")}>Sign Up</Text>
      <Text onPress={() => navigation.navigate("Login")}>Login</Text>
    </View>
  );
}
