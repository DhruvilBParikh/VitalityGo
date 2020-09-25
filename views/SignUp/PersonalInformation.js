import React from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import Colors from "../../constants/colors";
import appInputStyle from "../../constants/appInput";

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
      <View style={appInputStyle.container}>
        <Image
          source={require("../../assets/images/height-icon.png")}
          style={appInputStyle.image}
        />
        <TextInput placeholder="Height" style={appInputStyle.placeholder} />
      </View>

      {/* Weight */}
      <View style={appInputStyle.container}>
        <Image
          source={require("../../assets/images/weight-icon.png")}
          style={appInputStyle.image}
        />
        <TextInput placeholder="Weight" style={appInputStyle.placeholder} />
      </View>

      {/* Blood Group */}
      <View style={appInputStyle.container}>
        <Image
          source={require("../../assets/images/blood-group-icon.png")}
          style={appInputStyle.image}
        />
        <TextInput
          placeholder="Blood Group"
          style={appInputStyle.placeholder}
        />
      </View>

      {/* Birth Date */}
      <View style={appInputStyle.container}>
        <Image
          source={require("../../assets/images/calendar-icon.png")}
          style={appInputStyle.image}
        />
        <TextInput
          placeholder="Birthdate (mm/dd/yyyy)"
          style={appInputStyle.placeholder}
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
});
