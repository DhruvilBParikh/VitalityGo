import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import ValidationMsg from "../../components/ValidationMsg/ValidationMsg";
import Colors from "../../constants/colors";

export default function Gender({ route, navigation }) {
  const [gender, setGender] = useState(null);
  const [showSelectGender, setShowSelectGender] = useState(false);

  const navigationHandler = () => {
    if (gender === null) {
      setShowSelectGender(true);
      return;
    } else {
      setShowSelectGender(false);
    }

    const data = {
      ...route.params,
      userData: { ...route.params.userData, gender },
    };

    gender === "male"
      ? navigation.navigate("ProfilePictureMale", { data })
      : navigation.navigate("ProfilePictureFemale", { data });
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <View>
        <Text style={styles.header}> Which one are you? </Text>
      </View>

      {/* Gender of User */}
      <View
        style={{
          flexDirection: "row",
          margin: 25,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={[
              styles.whiteBackground,
              {
                backgroundColor: gender === "male" ? Colors.accent : "white",
              },
            ]}
            activeOpacity={0.9}
            onPress={() => setGender("male")}
          >
            <Image
              source={require("../../assets/images/gender-male.png")}
              style={
                (styles.maleImage,
                { tintColor: gender === "male" ? "white" : "black" })
              }
            />
          </TouchableOpacity>
          <Text
            style={{ fontWeight: "bold", fontSize: 17, color: Colors.text }}
          >
            Male
          </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={[
              styles.whiteBackground,
              {
                backgroundColor: gender === "female" ? Colors.accent : "white",
              },
            ]}
            activeOpacity={0.9}
            onPress={() => setGender("female")}
          >
            <Image
              source={require("../../assets/images/gender-female.png")}
              style={
                (styles.femaleImage,
                { tintColor: gender === "female" ? "white" : "black" })
              }
            />
          </TouchableOpacity>
          <Text
            style={{ fontWeight: "bold", fontSize: 17, color: Colors.text }}
          >
            Female
          </Text>
        </View>
      </View>

      {showSelectGender ? (
        <ValidationMsg message="Please select a gender" />
      ) : null}

      {/* Continue Button */}
      <AppButton title="Continue" clickHandler={navigationHandler} />
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
  header: {
    color: Colors.text,
    fontWeight: "bold",
    fontSize: 25,
  },
  whiteBackground: {
    alignItems: "center",
    justifyContent: "center",
    width: 130,
    height: 130,
    borderRadius: 30,
    margin: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
  },
  maleImage: {
    width: 40,
    height: 75,
  },
  femaleImage: {
    width: 50,
    height: 75,
  },
});
