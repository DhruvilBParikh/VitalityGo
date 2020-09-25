import React from "react";
import { View, Text } from "react-native";
import AppButton from "../../components/AppButton/AppButton";

export default function Login({ navigation }) {
  const homeNavigation = () => {
    navigation.navigate("Home");
  };
  return (
    <View>
      <AppButton title="Login" clickHandler={homeNavigation} />
    </View>
  );
}
