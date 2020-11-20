import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Bar } from "react-native-progress";
import Colors from "../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import config from "../../constants/config";
import AppButton from "../../components/AppButton/AppButton";

export default function Home({ navigation }) {
  const [totalCalories, setTotalCalories] = useState("");
  const [totalGlasses, setTotalGlasses] = useState("");

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    getDayToDay();
  }, []);

  const getDayToDay = async () => {
    try {
      // const date = new Date();
      const response = await axios.get(
        `${config.basepath}/api/users/${state.userData._id}/getDaytoDayGoal`,
        { headers: { Authorization: `Bearer ${state.token}` } }
      );
      // console.log("Day to day response: ", response.data.data);
      setTotalCalories(response.data.data.totalCalories);
      setTotalGlasses(response.data.data.totalWaterGlasses);
    } catch (err) {
      console.log("Get day-to-day error: ", err);
    }
  };

  const handleAddContact = () => {
    navigation.navigate("AddEmergency");
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "GetStarted" }],
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>
            Greetings, {state.userData.firstName}{" "}
          </Text>
          <Text style={styles.motivationText}>
            Take care of your body. It's the only place you have to live.
          </Text>
        </View>

        {/* Nutrition */}
        <View>
          <TouchableOpacity
            style={styles.whiteBackground}
            onPress={() => navigation.navigate("Nutrition")}
          >
            <View style={{ width: 100, height: 80, alignItems: "center" }}>
              <Image
                source={require("../../assets/images/home-nutrition.png")}
                style={{ width: 76, height: 75 }}
              />
            </View>
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}> Nutrition </Text>
              <View style={styles.progressContainer}>
                <Text style={{ color: "#BBADAD" }}>
                  {" "}
                  {totalCalories}/{state.patientData.caloriesGoal} cal{" "}
                </Text>
              </View>
              <Bar
                progress={totalCalories / state.patientData.caloriesGoal}
                width={200}
                color="#00D7A3"
              />
            </View>
          </TouchableOpacity>

          {/* Water */}
          <TouchableOpacity
            style={styles.whiteBackground}
            onPress={() => navigation.navigate("Water")}
          >
            <View style={{ width: 100, height: 80, alignItems: "center" }}>
              <Image
                source={require("../../assets/images/home-water.png")}
                style={{ width: 49, height: 71 }}
              />
            </View>
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}> Water </Text>
              <View style={styles.progressContainer}>
                <Text style={{ color: "#BBADAD" }}>
                  {" "}
                  {totalGlasses}/{state.patientData.waterGoal} glasses{" "}
                </Text>
              </View>
              <Bar
                progress={totalGlasses / state.patientData.waterGoal}
                width={200}
                color="#00D7A3"
              />
            </View>
          </TouchableOpacity>

          {/* ECG */}
          <TouchableOpacity
            style={[styles.whiteBackground, { borderBottomWidth: 1 }]}
            onPress={() => navigation.navigate("ECG")}
          >
            <View style={{ width: 100, height: 80, alignItems: "center" }}>
              <Image
                source={require("../../assets/images/home-ecg.png")}
                style={{ width: 69, height: 72 }}
              />
            </View>
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}> ECG </Text>
              <View style={styles.progressContainer}>
                <Text style={{ color: "#BBADAD" }}> 72 bpm </Text>
                <Text style={{ color: "#BBADAD", fontSize: 12 }}>
                  {" "}
                  65 bpm resting heart rate{" "}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <AppButton
          title="Add Emergency Contact"
          clickHandler={handleAddContact}
        />

        <AppButton title="Logout" clickHandler={handleLogout} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  greetingContainer: {
    marginHorizontal: 45,
    marginVertical: 40,
  },
  greetingText: {
    color: Colors.text,
    fontWeight: "bold",
    fontSize: 30,
  },
  motivationText: {
    marginTop: 20,
    color: Colors.text,
    fontWeight: "bold",
    fontSize: 20,
  },
  whiteBackground: {
    borderTopWidth: 1,
    borderColor: "#474444",
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 50,
    width: "100%",
  },
  summaryContainer: {
    width: "100%",
    paddingLeft: 20,
  },
  summaryTitle: {
    color: Colors.text,
    fontWeight: "bold",
    fontSize: 20,
  },
  progressContainer: {
    marginTop: 10,
  },
});
