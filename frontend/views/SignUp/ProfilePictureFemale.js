import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import ValidationMsg from "../../components/ValidationMsg/ValidationMsg";
import Colors from "../../constants/colors";

export default function ProfilePictureMale({ navigation }) {
  const [avatar, setAvatar] = useState(null);
  const [showSelectAvatar, setShowSelectAvatar] = useState(false);

  const navigationHandler = () => {
    if (avatar === null) {
      setShowSelectAvatar(true);
      return;
    } else {
      setShowSelectAvatar(false);
    }
    // store avatar
    console.log(avatar);

    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <View>
        <Text style={styles.header}> Choose your profile picture </Text>
      </View>

      {/* Avatar of User */}
      <View
        style={{
          flexDirection: "row",
          margin: 25,
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={[
              styles.whiteBackground,
              avatar === "female-avatar-1.png" ? { ...styles.selected } : {},
            ]}
            activeOpacity={0.8}
            onPress={() => setAvatar("female-avatar-1.png")}
          >
            <Image
              source={require("../../assets/images/female-avatar-1.png")}
              style={styles.femaleImage}
            />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={[
              styles.whiteBackground,
              avatar === "female-avatar-2.png" ? { ...styles.selected } : {},
            ]}
            activeOpacity={0.8}
            onPress={() => setAvatar("female-avatar-2.png")}
          >
            <Image
              source={require("../../assets/images/female-avatar-2.png")}
              style={styles.femaleImage}
            />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={[
              styles.whiteBackground,
              avatar === "female-avatar-3.png" ? { ...styles.selected } : {},
            ]}
            activeOpacity={0.8}
            onPress={() => setAvatar("female-avatar-3.png")}
          >
            <Image
              source={require("../../assets/images/female-avatar-3.png")}
              style={styles.femaleImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {showSelectAvatar ? (
        <ValidationMsg message="Please select a profile picture" />
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
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 130,
    height: 130,
    margin: 10,
  },
  femaleImage: {
    width: 100,
    height: 100,
  },
  selected: {
    borderRadius: 100,
    borderColor: Colors.accent,
    borderWidth: 10,
  },
});
