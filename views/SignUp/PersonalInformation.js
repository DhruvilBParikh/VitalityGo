import React from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import Colors from "../../constants/colors";

export default function PersonalInformation({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Title */}
      <View>
        <Text style={{ color: Colors.text, fontWeight: "bold", fontSize: 25 }}>
          {" "}
          Personal Information{" "}
        </Text>
      </View>

      {/* Height */}
      <View style={styles.textInputContainer}>
        <Image
          source={require("../../assets/images/height-icon.png")}
          style={{ width: 25, height: 25 }}
        />
        <TextInput
          placeholder="Height"
          style={{
            marginLeft: 15,
            paddingHorizontal: 5,
            fontSize: 15,
            color: Colors.text,
          }}
        />
      </View>

      {/* Weight */}
      <View style={styles.textInputContainer}>
        <Image
          source={require("../../assets/images/weight-icon.png")}
          style={{ width: 25, height: 25 }}
        />
        <TextInput
          placeholder="Weight"
          style={{
            marginLeft: 15,
            paddingHorizontal: 5,
            fontSize: 15,
            color: Colors.text,
          }}
        />
      </View>

      {/* Blood Group */}
      <View style={styles.textInputContainer}>
        <Image
          source={require("../../assets/images/blood-group-icon.png")}
          style={{ width: 25, height: 25 }}
        />
        <TextInput
          placeholder="Blood Group"
          style={{
            marginLeft: 15,
            paddingHorizontal: 5,
            fontSize: 15,
            color: Colors.text,
          }}
        />
      </View>

      {/* Birth Date */}
      <View style={styles.textInputContainer}>
        <Image
          source={require("../../assets/images/calendar-icon.png")}
          style={{ width: 25, height: 25 }}
        />
        <TextInput
          placeholder="Birthdate (mm/dd/yyyy)"
          style={{
            marginLeft: 15,
            paddingHorizontal: 5,
            fontSize: 15,
            color: Colors.text,
          }}
        />
      </View>

      {/* Continue button */}
      <AppButton
        title="Continue"
        clickHandler={() => navigation.navigate("Gender")}
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
  textInputContainer: {
    backgroundColor: "white",
    width: "75%",
    marginTop: 20,
    marginBottom: 20,
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
});
