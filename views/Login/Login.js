import React from "react";
import { View } from "react-native";
import AppButton from "../../components/AppButton/AppButton";

export default function Login({ navigation }) {
  return (
    <View>
      <AppButton
        title="Login"
        clickHandler={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          })
        }
      />
    </View>
  );
}
