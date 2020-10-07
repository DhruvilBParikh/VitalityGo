import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import AppButton from "../../components/AppButton/AppButton";
import Colors from "../../constants/colors";
import appInputStyle from "../../constants/appInput";
import ValidationMsg from "../../components/ValidationMsg/ValidationMsg";

export default function UserType({ navigation }) {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [role, setRole] = useState(null);

  const [showInvalidFirstName, setShowInvalidFirstName] = useState(false);
  const [showInvalidLastName, setShowInvalidLastName] = useState(false);
  const [showSelectRole, setShowSelectRole] = useState(false);

  const navigationHandler = () => {
    let navigate = true;

    if (firstName === null) {
      setShowInvalidFirstName(true);
      navigate = false;
    } else {
      setShowInvalidFirstName(false);
    }

    if (lastName === null) {
      setShowInvalidLastName(true);
      navigate = false;
    } else {
      setShowInvalidLastName(false);
    }

    if (role === null) {
      setShowSelectRole(true);
      navigate = false;
    } else {
      setShowSelectRole(false);
    }

    if (navigate) {
      navigation.navigate("Credential", {
        userData: {
          firstName,
          lastName,
          type: role,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Input name */}
      <View>
        <Text style={styles.header}>You are...</Text>
      </View>

      <View style={appInputStyle.container}>
        {/* First Name */}
        <Image
          source={require("../../assets/images/user-icon.png")}
          style={appInputStyle.image}
        />
        <TextInput
          onChangeText={(text) => setFirstName(text)}
          placeholder="First Name"
          value={firstName}
          style={appInputStyle.placeholder}
        />
      </View>

      {showInvalidFirstName ? (
        <ValidationMsg message="Please enter first name" />
      ) : null}

      {/* Last Name */}
      <View style={appInputStyle.container}>
        <Image
          source={require("../../assets/images/user-icon.png")}
          style={appInputStyle.image}
        />
        <TextInput
          onChangeText={(text) => setLastName(text)}
          placeholder="Last Name"
          value={lastName}
          style={appInputStyle.placeholder}
        />
      </View>

      {showInvalidLastName ? (
        <ValidationMsg message="Please enter last name" />
      ) : null}

      {/* Type of User */}
      <View>
        <Text
          style={{
            color: Colors.text,
            fontWeight: "bold",
            fontSize: 25,
            marginTop: 40,
          }}
        >
          What type of user?
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          margin: 10,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={[
              styles.whiteBackground,
              { backgroundColor: role === "doctor" ? Colors.accent : "white" },
            ]}
            activeOpacity={0.9}
            onPress={() => setRole("doctor")}
          >
            <Image
              source={require("../../assets/images/user-doctor.png")}
              style={
                (styles.userTypeImage,
                { tintColor: role === "doctor" ? "white" : "black" })
              }
            />
          </TouchableOpacity>
          <Text
            style={{ fontWeight: "bold", fontSize: 17, color: Colors.text }}
          >
            Doctor
          </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={[
              styles.whiteBackground,
              { backgroundColor: role === "patient" ? Colors.accent : "white" },
            ]}
            activeOpacity={0.9}
            onPress={() => setRole("patient")}
          >
            <Image
              source={require("../../assets/images/user-general.png")}
              style={
                (styles.userTypeImage,
                { tintColor: role === "patient" ? "white" : "black" })
              }
            />
          </TouchableOpacity>
          <Text
            style={{ fontWeight: "bold", fontSize: 17, color: Colors.text }}
          >
            Patient
          </Text>
        </View>
      </View>

      {showSelectRole ? <ValidationMsg message="Please select a role" /> : null}

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
  whiteBackground: {
    backgroundColor: "white",
    padding: 50,
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
  userTypeImage: {
    width: 100,
    height: 100,
  },
});
