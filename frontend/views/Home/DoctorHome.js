import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import Colors from "../../constants/colors";
import axios from "axios";
import config from "../../constants/config";
import { useSelector } from "react-redux";
import profileImage from "../../constants/profileImage";

const DoctorHome = ({ navigation }) => {
  const [patients, setPatients] = useState([]);
  const state = useSelector((state) => state);

  useEffect(() => {
    console.log("Getting Patients: ");
    axios
      .get(`${config.basepath}/api/users/${state.userData._id}/getPatients`, {
        headers: { Authorization: `Bearer ${state.token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Get my patients response: ", response.data.data);
          setPatients(response.data.data);
        }
      })
      .catch((err) => console.log("Get my patients error: ", err));
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 30, alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: Colors.text }}>
          Patients
        </Text>
      </View>
      <View style={{ marginVertical: 15, width: '100%', padding: 20  }}>
        {patients.map((patient, i) => {
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
                  source={profileImage[patient.profilePicture]}
                />
              </View>
              <View style={{}}>
                <Text style={{ fontSize: 17 }}>
                  {" "}
                  {patient.firstName} {patient.lastName}{" "}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
      <AppButton
        title="Notifications"
        clickHandler={() => {
          navigation.navigate("Notification");
        }}
      />
    </View>
  );
};

export default DoctorHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
  },
});
