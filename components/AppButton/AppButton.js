import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import appButtonStyle from "../../constants/appButton";

export default function AppButton(props) {
  return (
    <View style={appButtonStyle.container}>
      <TouchableOpacity
        style={appButtonStyle.button}
        activeOpacity={0.8}
        onPress={props.clickHandler}
      >
        <Text style={appButtonStyle.text}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
}
