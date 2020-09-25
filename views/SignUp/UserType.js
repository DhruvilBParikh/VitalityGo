import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import AppButton from "../../components/AppButton/AppButton";
import Colors from "../../constants/colors";
import appInputStyle from "../../constants/appInput";

export default function UserType({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Input name */}
      <View>
        <Text style={{ color: Colors.text, fontWeight: "bold", fontSize: 25 }}>
          {" "}
          You are...{" "}
        </Text>
      </View>
      <View style={appInputStyle.container}>
        <Image
          source={require("../../assets/images/user-icon.png")}
          style={appInputStyle.image}
        />
        <TextInput placeholder="Full Name" style={appInputStyle.placeholder} />
      </View>

      {/* Type of User */}
      <View>
        <Text style={{ color: Colors.text, fontWeight: "bold", fontSize: 25 }}>
          {" "}
          What type of user?{" "}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          margin: 25,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.whiteBackground} activeOpacity={0.9}>
            <Image
              source={require("../../assets/images/user-doctor.png")}
              style={styles.userTypeImage}
            />
          </TouchableOpacity>
          <Text
            style={{ fontWeight: "bold", fontSize: 17, color: Colors.text }}
          >
            Doctor
          </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.whiteBackground} activeOpacity={0.9}>
            <Image
              source={require("../../assets/images/user-general.png")}
              style={styles.userTypeImage}
            />
          </TouchableOpacity>
          <Text
            style={{ fontWeight: "bold", fontSize: 17, color: Colors.text }}
          >
            General
          </Text>
        </View>
      </View>

      <AppButton
        title="Continue"
        clickHandler={() => navigation.navigate("Credential")}
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
  backButton: {
    flex: 1,
    marginLeft: 20,
  },
  logo: {
    flex: 1,
  },
  space: {
    flex: 1,
  },
  textInputContainer: {
    backgroundColor: "white",
    width: "75%",
    margin: 40,
    height: 40,
    alignItems: "center",
    paddingLeft: 10,
    flexDirection: "row",
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
  },
  whiteBackground: {
    alignItems: "center",
    justifyContent: "center",
    width: 130,
    height: 130,
    borderRadius: 30,
    backgroundColor: "white",
    margin: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
  },
  userTypeImage: {
    width: 100,
    height: 100,
  },
});
