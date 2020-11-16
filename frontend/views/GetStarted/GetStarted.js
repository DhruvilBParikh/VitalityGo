import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import Colors from "../../constants/colors";

export default function GetStarted({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo-main-screen.png")}
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>Welcome to Vitality Go</Text>
      <ImageBackground
        source={require("../../assets/images/white-background.png")}
        style={styles.whiteBackground}
      >
        <Image
          source={require("../../assets/images/get-started.png")}
          style={styles.getStartedImage}
        />
      </ImageBackground>

      {/* Continue Button */}
      <AppButton
        title="Get Started"
        clickHandler={() => navigation.navigate("UserType")}
      />

      {/* Login */}
      <View style={styles.textContainer}>
        <Text style={{ color: Colors.text, fontSize: 18, fontWeight: "bold" }}>
          Already have an account?&nbsp;
        </Text>
        <Text
          onPress={() => navigation.navigate("Login")}
          style={{ color: Colors.accent, fontSize: 18, fontWeight: "bold" }}
        >
          Sign in
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: 240,
    height: 240,
  },
  welcomeText: {
    marginTop: -30,
    color: Colors.text,
    fontWeight: "bold",
    fontSize: 20,
  },
  getStartedImage: {
    width: "100%",
    height: 208,
  },
  whiteBackground: {
    justifyContent: "center",
    marginVertical: 50,
    width: "100%",
    height: 250,
  },
  textContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
