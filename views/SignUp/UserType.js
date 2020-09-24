import React from "react";
import { View, Text } from "react-native";

export default function UserType({ navigation }) {
  return (
    <View>
      <Text onPress={() => navigation.navigate("PersonalInformation")}>
        Continue
      </Text>
    </View>
  );
}
