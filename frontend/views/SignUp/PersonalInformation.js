import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-community/picker";
import AppButton from "../../components/AppButton/AppButton";
import Colors from "../../constants/colors";
import appInputStyle from "../../constants/appInput";
import ValidationMsg from "../../components/ValidationMsg/ValidationMsg";

export default function PersonalInformation({ route, navigation }) {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [bloodGroup, setBloodGroup] = useState(null);

  const todayDate = new Date();
  const [date, setDate] = useState(todayDate);
  const [show, setShow] = useState(false);

  const heights = [["Height", null]];
  for (let i = 100; i < 300; i++) {
    heights.push([i.toString() + " cm", i]);
  }

  const weights = [["Weight", null]];
  for (let i = 140; i <= 320; i++) {
    weights.push([i.toString() + " lb", i]);
  }

  const bloodGroups = [
    ["Blood Group", null],
    ["A+", "A+"],
    ["A-", "A-"],
    ["B+", "B+"],
    ["B-", "B-"],
    ["AB+", "AB+"],
    ["AB-", "AB-"],
    ["O+", "O+"],
    ["O-", "O-"],
  ];

  const [showSelectHeight, setShowSelectHeight] = useState(false);
  const [showSelectWeight, setShowSelectWeight] = useState(false);
  const [showSelectBloodGroup, setShowSelectBloodGroup] = useState(false);
  const [showSelectBirthday, setShowSelectBirthday] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const navigationHandler = () => {
    let navigate = true;

    if (height === null) {
      setShowSelectHeight(true);
      navigate = false;
    } else {
      setShowSelectHeight(false);
    }

    if (weight === null) {
      setShowSelectWeight(true);
      navigate = false;
    } else {
      setShowSelectWeight(false);
    }

    if (bloodGroup === null) {
      setShowSelectBloodGroup(true);
      navigate = false;
    } else {
      setShowSelectBloodGroup(false);
    }

    if (
      date >= todayDate ||
      date.toLocaleDateString() === todayDate.toLocaleDateString()
    ) {
      setShowSelectBirthday(true);
      navigate = false;
    } else {
      setShowSelectBirthday(false);
    }

    if (navigate) {
      navigation.navigate("Gender", {
        ...route.params,
        patientData: {
          birthdate: date.toJSON(),
          height,
          weight,
          bloodGroup,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.header}>Personal Information</Text>
      </View>

      {/* Height */}
      <View style={appInputStyle.container}>
        <Image
          source={require("../../assets/images/height-icon.png")}
          style={appInputStyle.image}
        />
        <Picker
          selectedValue={height}
          style={appInputStyle.picker}
          onValueChange={(itemValue) => setHeight(itemValue)}
        >
          {heights.map((wt, index) => {
            return <Picker.Item key={index} label={wt[0]} value={wt[1]} />;
          })}
        </Picker>
      </View>

      {showSelectHeight ? <ValidationMsg message="Please add height" /> : null}

      {/* Weight */}
      <View style={appInputStyle.container}>
        <Image
          source={require("../../assets/images/weight-icon.png")}
          style={appInputStyle.image}
        />
        <Picker
          selectedValue={weight}
          style={appInputStyle.picker}
          onValueChange={(itemValue) => setWeight(itemValue)}
        >
          {weights.map((wt, index) => {
            return <Picker.Item key={index} label={wt[0]} value={wt[1]} />;
          })}
        </Picker>
      </View>

      {showSelectWeight ? <ValidationMsg message="Please add weight" /> : null}

      {/* Blood Group */}
      <View style={appInputStyle.container}>
        <Image
          source={require("../../assets/images/blood-group-icon.png")}
          style={appInputStyle.image}
        />
        <Picker
          selectedValue={bloodGroup}
          style={appInputStyle.picker}
          onValueChange={(itemValue) => setBloodGroup(itemValue)}
        >
          {bloodGroups.map((bg, index) => {
            return <Picker.Item key={index} label={bg[0]} value={bg[1]} />;
          })}
        </Picker>
      </View>

      {showSelectBloodGroup ? (
        <ValidationMsg message="Please select blood group" />
      ) : null}

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

      {showSelectBirthday ? (
        <ValidationMsg message="Please add birthday" />
      ) : null}

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
