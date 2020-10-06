import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-community/picker";
import AppButton from "../../components/AppButton/AppButton";
import Colors from "../../constants/colors";
import appInputStyle from "../../constants/appInput";

export default function PersonalInformation({ navigation }) {
  const [bloodGroup, setBloodGroup] = useState("A+");
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const todayDate = new Date();
  const [date, setDate] = useState(todayDate);
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const navigationHandler = () => {
    if (date.toLocaleDateString() === todayDate.toLocaleDateString()) {
      setDate("");
    }

    console.log(date);
    return;

    navigation.navigate("Gender");
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={{ marginBottom: 20 }}>
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
        {/* <Text style={[appInputStyle.placeholder, styles.greyText]}>
          {bloodGroup}
        </Text> */}
        <Picker
          selectedValue={bloodGroup}
          style={appInputStyle.picker}
          onValueChange={(itemValue, itemIndex) => setBloodGroup(itemValue)}
        >
          {bloodGroups.map((bg, index) => {
            return (
              <Picker.Item
                key={index}
                label={bg}
                value={bg}
                style={appInputStyle.pickerItem}
              />
            );
          })}
        </Picker>
        {/* <TextInput
          placeholder="Blood Group"
          style={appInputStyle.placeholder}
        /> */}
      </View>

      {/* Birth Date */}
      <View style={appInputStyle.container}>
        <Image
          source={require("../../assets/images/calendar-icon.png")}
          style={appInputStyle.image}
        />
        {show ? (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
            style={appInputStyle.datePicker}
          />
        ) : null}
        <Text
          style={[appInputStyle.placeholder, styles.greyText]}
          onPress={() => setShow(true)}
        >
          {date.toLocaleDateString()}
        </Text>
      </View>

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
  greyText: {
    color: "rgb(160, 160, 160)",
  },
});
