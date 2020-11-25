import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import Colors from "../../constants/colors";
import axios from "axios";
import config from "../../constants/config";
import { StatusBar } from "expo-status-bar";

const Notification = ({ navigation }) => {
  const state = useSelector((state) => state);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${config.basepath}/api/notifications/${state.userData._id}/getNotifications`,
        { headers: { Authorization: `Bearer ${state.token}` } }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("Notifications response: ", response.data.data.length);
          setNotifications(response.data.data);
        }
      })
      .catch((err) => {
        console.log("Get notifications error: ", err);
      });
  }, []);

  const respond = (status, notificationId, toUser) => {
    const data = {
      toUser,
      status,
      description: `${state.userData.firstName} ${state.userData.lastName} ${status} your request.`,
    };
    axios
      .put(
        `${config.basepath}/api/notifications/${state.userData._id}/respondStatus`,
        data,
        { headers: { Authorization: `Bearer ${state.token}` } }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("Respond Status Response: ", response.data.msg);
          const data = {};
          axios
            .put(
              `${config.basepath}/api/notifications/${notificationId}/updateNotification`,
              data,
              { headers: { Authorization: `Bearer ${state.token}` } }
            )
            .then((response) => {
              if (response.status === 200) {
                console.log(
                  "Update Notification Response: ",
                  response.data.msg
                );
                navigation.replace("Notification");
              }
            })
            .catch((err) => {
              console.log("Update Notification Error: ", err);
            });
        }
      })
      .catch((err) => {
        console.log("Respond Status Error: ", err);
      });
  };

  return (
    <View style={styles.container}>
      {notifications.map((notification, index) => (
        <TouchableOpacity key={index} style={styles.notificationContainer}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationDescription}>
            {notification.description}
          </Text>

          {notification.title === "Add Patient Request" ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() =>
                  respond(
                    "approved",
                    notification._id,
                    notification.fromUser._id
                  )
                }
                activeOpacity={0.7}
                style={styles.approveButton}
              >
                <Text style={styles.buttonText}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  respond(
                    "declined",
                    notification._id,
                    notification.fromUser._id
                  )
                }
                activeOpacity={0.7}
                style={styles.declineButton}
              >
                <Text style={styles.buttonText}>Decline</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {notification.title === "Patient's Report" ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("PatientDetails", {
                    patientId: notification.fromUser._id,
                    data: notification.data
                  });
                }}
                activeOpacity={0.7}
                style={styles.viewButton}
              >
                <Text style={styles.viewButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  notificationContainer: {
    borderBottomWidth: 1,
    borderRadius: 10,
    width: "100%",
    padding: 15,
    marginTop: 5,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
  },
  notificationDescription: {
    fontSize: 15,
    color: Colors.text,
    textAlign: "justify",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  approveButton: {
    backgroundColor: "#9AE58E",
    alignSelf: "stretch",
    paddingHorizontal: 20,
    paddingVertical: 5,
    width: "30%",
    borderRadius: 15,
  },
  declineButton: {
    backgroundColor: "#F4DCDC",
    alignSelf: "stretch",
    paddingHorizontal: 20,
    paddingVertical: 5,
    width: "30%",
    borderRadius: 15,
  },
  viewButton: {
    backgroundColor: Colors.accent,
    alignSelf: "stretch",
    paddingHorizontal: 20,
    paddingVertical: 5,
    width: "35%",
    borderRadius: 15,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.text,
  },
  viewButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.white,
  },
});
