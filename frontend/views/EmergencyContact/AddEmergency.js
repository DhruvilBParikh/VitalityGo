import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import Colors from "../../constants/colors";
import { Picker } from "@react-native-community/picker";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Table, Rows } from "react-native-table-component";
import axios from "react-native-axios/lib/axios";
import appInputStyle from "../../constants/appInput";
import appButtonStyle from "../../constants/appButton";
import profileImage from "../../constants/profileImage";
import Toast from "react-native-toast-message";
import config from "../../constants/config";
import { useSelector } from "react-redux";

export default function AddEmergency({ navigation }) {
  const state = useSelector((state) => state);
  const [doctors, setDoctors] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);

  const [currentSelection, setCurrentSelection] = useState(null);

  const [currentDoctors, setCurrentDoctors] = useState([]);

  useEffect(() => {
    //axios call to get all the doctors
    axios
      .get(`${config.basepath}/api/users/getAllDoctors`, {
        headers: { Authorization: `Bearer ${state.token}` },
      })
      .then((res) => {
        console.log("Get all doctores response: ", res.data.data);
        setAllDoctors(res.data.data);
      })
      .catch((err) => console.log("Get all doctors error: ", err));
  }, []);

  useEffect(() => {
    axios
      .get(`${config.basepath}/api/users/${state.userData._id}/getDoctors`, {
        headers: { Authorization: `Bearer ${state.token}` },
      })
      .then((res) => {
        console.log("Get my doctores response: ", res.data.data);
        setCurrentDoctors(res.data.data);
      })
      .catch((err) => console.log("Get my doctors error: ", err));
  }, []);

  useEffect(() => {
    const doctorsMap = new Map();
    currentDoctors.map((d) => {
      doctorsMap.set(d._id, d)
    })

    const selection = [["Select Doctor", null]];
    allDoctors.map((d) => {
      if (!doctorsMap.has(d._id)) {
        const temp = [];
        temp.push(d.firstName + " " + d.lastName);
        temp.push(d._id);
        selection.push(temp);
      }
    })
    console.log("Doctors: ", doctors);
    console.log("Selections::: ", selection, allDoctors.length);
    setDoctors(selection);
  }, [allDoctors, currentDoctors]);

  const requestDoctor = () => {
    const data = {
      toUser: currentSelection,
      description: state.userData.firstName + " " +state.userData.lastName + " requested to add you as a doctor"
    };
    axios
      .put(
        `${config.basepath}/api/users/${state.userData._id}/addDoctor`,
        data,
        { headers: { Authorization: `Bearer ${state.token}` } }
      )
      .then((response) => {
        if (response.status === 200) {
          Toast.show({
            text1: "Add Doctor",
            text2: response.data.msg,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ScrollView style={styles.tableContainer}>
      {/* Add Doctor */}
      <View style={{ alignItems: "center" }}>
        <View style={appInputStyle.container}>
          <Picker
            selectedValue={currentSelection}
            style={appInputStyle.picker}
            onValueChange={(itemValue) => setCurrentSelection(itemValue)}
          >
            {doctors.map((c, index) => {
              return <Picker.Item key={index} label={c[0]} value={c[1]} />;
            })}
          </Picker>
        </View>
        <View style={{ margin: 10, width: "50%" }}>
          <TouchableOpacity
            style={[appButtonStyle.button, { paddingVertical: 15 }]}
            onPress={requestDoctor}
          >
            <Text style={appButtonStyle.text}>Add Doctor</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: 30 }}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{ fontSize: 18, fontWeight: "bold", color: Colors.text }}
          >
            Current Doctors
          </Text>
        </View>
        <View style={{ marginVertical: 15 }}>
          {currentDoctors.map((doctor, i) => {
            return (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: Colors.white,
                  borderRadius: 20,
                  marginTop: 10,
                  padding: 10,
                }}
              >
                <View style={{ marginRight: 20, marginLeft: 20 }}>
                  <Image
                    style={{ width: 40, height: 40 }}
                    source={profileImage[doctor.profilePicture]}
                  />
                </View>
                <View style={{}}>
                  <Text style={{ fontSize: 17 }}>
                    {" "}
                    Dr. {doctor.firstName} {doctor.lastName}{" "}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
});
