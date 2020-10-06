import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TextInput } from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import ExternalAuth from "../../components/ExternalAuth/ExternalAuth";
import ValidationMsg from "../../components/ValidationMsg/ValidationMsg";
import appInputStyle from "../../constants/appInput";
import Colors from "../../constants/colors";
import isValidEmail from "../../constants/emailValidator";
import isValidPassword from "../../constants/passwordValidator";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showInvalidEmail, setShowInvalidEmail] = useState(false);
  const [showInvalidPassword, setShowInvalidPassword] = useState(false);

  const loginHandler = () => {
    let navigate = true;

    if (isValidEmail(email)) {
      setShowInvalidEmail(false);
    } else {
      setShowInvalidEmail(true);
      navigate = false;
    }

    if (isValidPassword(password)) {
      setShowInvalidPassword(false);
    } else {
      setShowInvalidPassword(true);
      navigate = false;
    }

    if (navigate) {
      // store email, password
      console.log(email, password);

      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Email */}
      <View style={appInputStyle.container}>
        <Image
          source={require("../../assets/images/email.png")}
          style={appInputStyle.image}
        />
        <TextInput
          placeholder="Email"
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          style={appInputStyle.placeholder}
        />
      </View>

      {showInvalidEmail ? <ValidationMsg message="Email is invalid" /> : null}

      {/* Password */}
      <View style={appInputStyle.container}>
        <Image
          source={require("../../assets/images/password.png")}
          style={appInputStyle.image}
        />
        <TextInput
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          style={appInputStyle.placeholder}
        />
      </View>

      {showInvalidPassword ? (
        <ValidationMsg message="Password should be 8 - 16 characters" />
      ) : null}

      {/* external sign up */}
      <ExternalAuth title="Sign in with" />

      {/* login button */}
      <AppButton title="Login" clickHandler={loginHandler} />
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
