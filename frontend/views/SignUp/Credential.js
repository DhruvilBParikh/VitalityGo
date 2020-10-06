import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TextInput } from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import ExternalAuth from "../../components/ExternalAuth/ExternalAuth";
import ValidationMsg from "../../components/ValidationMsg/ValidationMsg";
import appInputStyle from "../../constants/appInput";
import Colors from "../../constants/colors";
import isValidEmail from "../../constants/emailValidator";
import isValidPassword from "../../constants/passwordValidator";

export default function Credential({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const [showInvalidEmail, setShowInvalidEmail] = useState(false);
  const [showInvalidPassword, setShowInvalidPassword] = useState(false);
  const [showPasswordMismatch, setShowPasswordMismatch] = useState(false);

  const signUpHandler = () => {
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

    if (password === confirmedPassword) {
      setShowPasswordMismatch(false);
    } else {
      setShowPasswordMismatch(true);
      navigate = false;
    }

    if (navigate) {
      // store email, password
      console.log(email, password);

      navigation.navigate("PersonalInformation");
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
          style={appInputStyle.placeholder}
          onChangeText={(text) => setEmail(text)}
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
          style={appInputStyle.placeholder}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      {showInvalidPassword ? (
        <ValidationMsg message="Password should be 8 - 16 characters" />
      ) : null}

      {/* Confirm password */}
      <View style={appInputStyle.container}>
        <Image
          source={require("../../assets/images/password.png")}
          style={appInputStyle.image}
        />
        <TextInput
          placeholder="Confirm password"
          value={confirmedPassword}
          secureTextEntry={true}
          style={appInputStyle.placeholder}
          onChangeText={(text) => setConfirmedPassword(text)}
        />
      </View>

      {showPasswordMismatch ? (
        <ValidationMsg message="Passwords do not match" />
      ) : null}

      {/* external sign up */}
      <ExternalAuth title="Sign up with" />

      {/* login button */}
      <AppButton title="Continue" clickHandler={signUpHandler} />
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
