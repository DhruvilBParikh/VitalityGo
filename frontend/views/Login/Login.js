import React from "react";
import { View, StyleSheet, Image, Text, TextInput } from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import ExternalAuth from "../../components/ExternalAuth/ExternalAuth";
import appInputStyle from "../../constants/appInput";
import Colors from "../../constants/colors";

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Email */}
      <View style={appInputStyle.container}>
        <Image
          source={require("../../assets/images/email.png")}
          style={appInputStyle.image}
        />
        <TextInput placeholder="Email" style={appInputStyle.placeholder} />
      </View>

      {/* Password */}
      <View style={appInputStyle.container}>
        <Image
          source={require("../../assets/images/password.png")}
          style={appInputStyle.image}
        />
        <TextInput placeholder="Password" style={appInputStyle.placeholder} />
      </View>

      {/* external sign up */}
      <ExternalAuth title="Sign in with" />

      {/* login button */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
