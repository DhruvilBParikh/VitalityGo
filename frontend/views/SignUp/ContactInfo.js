import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet } from "react-native";
import { Picker } from "@react-native-community/picker";
import AppButton from "../../components/AppButton/AppButton";
import Colors from "../../constants/colors";
import appInputStyle from "../../constants/appInput";
import ValidationMsg from "../../components/ValidationMsg/ValidationMsg";
import isValidPhoneNumber from "../../constants/phoneNumberValidator";

export default function ContactInfo({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState(null);
  const [countryState, setCountryState] = useState(null);
  const [city, setCity] = useState(null);

  const [showPhoneMsg, setShowPhoneMsg] = useState(false);
  const [showCountryMsg, setShowCountryMsg] = useState(false);
  const [showStateMsg, setShowStateMsg] = useState(false);
  const [showCityMsg, setShowCityMsg] = useState(false);

  const [countries, setCountries] = useState([
    ["Country", null],
    ["USA", "USA"],
    ["Canada", "Canada"],
  ]);

  const [states, setStates] = useState([
    ["State", null],
    ["California", "California"],
    ["Ontario", "Ontario"],
    ["New York", "New York"],
  ]);

  const [cities, setCities] = useState([
    ["City", null],
    ["San Jose", "San Jose"],
    ["San Francisco", "San Francisco"],
    ["New York", "New York"],
    ["Torronto", "Torronto"],
    ["Ottawa", "Ottawa"],
  ]);

  const changeCountry = (countryName) => {
    setCountry(countryName);
    // update states array
  };
  const changeState = (stateName) => {
    setCountryState(stateName);
    // update cities array
  };

  const navigationHandler = () => {
    let navigate = true;

    if (isValidPhoneNumber(phoneNumber)) {
      setShowPhoneMsg(false);
    } else {
      setShowPhoneMsg(true);
      navigate = false;
    }

    if (country === null) {
      setShowCountryMsg(true);
      navigate = false;
    } else {
      setShowCountryMsg(false);
    }

    if (countryState === null) {
      setShowStateMsg(true);
      navigate = false;
    } else {
      setShowStateMsg(false);
    }

    if (city === null) {
      setShowCityMsg(true);
      navigate = false;
    } else {
      setShowCityMsg(false);
    }

    if (navigate) {
      // store phone number, country, state, city
      console.log(phoneNumber, country, countryState, city);

      const role = "patient";
      if (role === "patient") navigation.navigate("PersonalInformation");
      else navigation.navigate("Gender");
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Contact Information</Text>
      </View>

      {/* Phone number */}
      <View style={appInputStyle.container}>
        <Image
          source={require("../../assets/images/phone.png")}
          style={appInputStyle.image}
        />
        <TextInput
          placeholder="Phone number"
          value={phoneNumber}
          keyboardType="phone-pad"
          style={appInputStyle.placeholder}
          onChangeText={(text) => setPhoneNumber(text)}
        />
      </View>

      {showPhoneMsg ? (
        <ValidationMsg message="Enter a valid phone number" />
      ) : null}

      {/* Country */}
      <View style={appInputStyle.container}>
        <Image
          source={require("../../assets/images/country.png")}
          style={appInputStyle.image}
        />
        <Picker
          selectedValue={country}
          style={appInputStyle.picker}
          onValueChange={(itemValue) => changeCountry(itemValue)}
        >
          {countries.map((c, index) => {
            return <Picker.Item key={index} label={c[0]} value={c[1]} />;
          })}
        </Picker>
      </View>

      {showCountryMsg ? (
        <ValidationMsg message="Please select a country" />
      ) : null}

      {/* State */}
      <View style={appInputStyle.container}>
        <Image
          source={require("../../assets/images/state.png")}
          style={appInputStyle.image}
        />
        <Picker
          selectedValue={countryState}
          style={appInputStyle.picker}
          enabled={country !== null}
          onValueChange={(itemValue) => changeState(itemValue)}
        >
          {states.map((s, index) => {
            return <Picker.Item key={index} label={s[0]} value={s[1]} />;
          })}
        </Picker>
      </View>

      {showStateMsg ? <ValidationMsg message="Please select a state" /> : null}

      {/* City */}
      <View style={appInputStyle.container}>
        <Image
          source={require("../../assets/images/city.png")}
          style={appInputStyle.image}
        />
        <Picker
          selectedValue={city}
          style={appInputStyle.picker}
          enabled={countryState !== null}
          onValueChange={(itemValue) => setCity(itemValue)}
        >
          {cities.map((c, index) => {
            return <Picker.Item key={index} label={c[0]} value={c[1]} />;
          })}
        </Picker>
      </View>

      {showCityMsg ? <ValidationMsg message="Please select a city" /> : null}

      {/* Continue button */}
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
  greyText: {
    color: "rgb(160, 160, 160)",
  },
});
