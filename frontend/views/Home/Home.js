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
  console.log("Redux state: ", state);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDayToDay();
    });
    return unsubscribe;
  }, [navigation]);

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

  const navigate = (routeName) => {
    navigation.navigate(routeName);
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "GetStarted" }],
    });
  };

  return (
    <View style={{flex:1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>
              Greetings, {state.userData.firstName}{" "}
            </Text>
            <Text style={styles.motivationText}>
              Take care of your body. It's the only place you have to live.
            </Text>
          </View>

          <View>
            {/* Nutrition */}
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
                  <Text style={{ color: "#BBADAD" }}> {state.patientData.heartrate} bpm </Text>
                  <Text style={{ color: "#BBADAD", fontSize: 12 }}>
                    {" "}
                    65 bpm resting heart rate{" "}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navTouchable} activeOpacity={0.7} onPress={() => navigate('AddEmergency')}>
          <Image style={styles.navigationImage} source={require('../../assets/images/add-contact.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navTouchable} activeOpacity={0.7} onPress={() => navigate('EditProfile')}>
          <Image style={styles.navigationImage} source={require('../../assets/images/user-icon.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navTouchable} activeOpacity={0.7} onPress={() => navigate('Notification')}>
          <Image style={styles.navigationImage} source={require('../../assets/images/notification.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navTouchable} activeOpacity={0.7} onPress={handleLogout}>
          <Image style={styles.navigationImage} source={require('../../assets/images/logout.png')}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: 'center'
  },
  greetingContainer: {
    marginHorizontal: 45,
    marginTop: -100,
    marginBottom: 60,
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
    paddingVertical: 20,
    paddingHorizontal: 80,
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
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position:'absolute',
    bottom:0,
    width:'100%',
    paddingVertical:10,
    elevation: 2,
    backgroundColor: Colors.white
  },
  navigationImage: {
    width:25,
    height:25,
    tintColor: Colors.accent
  },
  navTouchable: {
    margin:15,
    flex:1
  }
});
