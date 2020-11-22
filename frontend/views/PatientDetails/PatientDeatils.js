import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Colors from "../../constants/colors";
import axios from "axios";
import config from "../../constants/config";
import { useSelector } from "react-redux";
import { StackedBarChart, XAxis, YAxis } from "react-native-svg-charts";
import * as scale from "d3-scale";

const PatientDeatils = ({ route, navigation }) => {
  const state = useSelector((state) => state);
  const [patientInfo, setPatientInfo] = useState(null);
  const [patientProfile, setPatientProfile] = useState(null);
  const [goal, setGoal] = useState({});
  const [caloriesDayToDay, setCaloriesDayToDay] = useState([]);
  const [waterDayToDay, setWaterDayToDay] = useState([]);

  var weekday = new Array(7);
  weekday[0] = "Mon";
  weekday[1] = "Tue";
  weekday[2] = "Wed";
  weekday[3] = "Thu";
  weekday[4] = "Fri";
  weekday[5] = "Sat";
  weekday[6] = "Sun";
  const data = [
    {
      month: new Date(2015, 0, 1)
        .getDay()
        .toLocaleString("en-us", { weekday: "long" }),
      calories: 3840,
      goal: 160,
    },
    {
      month: new Date(2015, 1, 1).getDay(),
      calories: 1600,
      goal: 2400,
    },
    {
      month: new Date(2015, 2, 1).getDay(),
      calories: 460,
      goal: 3540,
    },
    {
      month: new Date(2015, 3, 1).getDay(),
      calories: 3320,
      goal: 680,
    },
    {
      month: new Date(2015, 1, 1).getDay(),
      calories: 1600,
      goal: 2400,
    },
    {
      month: new Date(2015, 2, 1).getDay(),
      calories: 460,
      goal: 3540,
    },
    {
      month: new Date(2015, 3, 1).getDay(),
      calories: 3320,
      goal: 680,
    },
  ];

  const colors = ["#5a189a", "#e0aaff"];
  const waterColors = ["#0077b6", "#caf0f8"];

  const keys = ["calories", "goal"];
  const waterKeys = ["waterGlasses", "goal"];

  useEffect(() => {
    axios
      .get(
        `${config.basepath}/api/users/${route.params.patientId}/getPatientInfo`,
        {
          headers: { Authorization: `Bearer ${state.token}` },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          //   console.log("Get patient response: ", response.data.data);
          setPatientInfo(response.data.data.patientInfo);
          setPatientProfile(response.data.data.patientProfile);
          setGoal(response.data.data.goal);
          setCaloriesDayToDay(
            response.data.data.caloriesDayToDayGoal.map((d) => {
              return {
                day: new Date(d.onDate).getDay(),
                goal: response.data.data.goal.caloriesGoal - d.totalCalories,
                calories: d.totalCalories,
              };
            })
          );
          setWaterDayToDay(
            response.data.data.waterDayToDayGoal.map((d) => {
              return {
                day: new Date(d.onDate).getDay(),
                goal: response.data.data.goal.waterGoal - d.totalWaterGlasses,
                waterGlasses: d.totalWaterGlasses,
              };
            })
          );
        }
      })
      .catch((err) => console.log("Get my patients error: ", err));
  }, []);
  console.log("Calories d t d: ", caloriesDayToDay);
  console.log("Water d t d: ", waterDayToDay);
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Patient Info */}
        {patientInfo && (
          <View style={styles.card}>
            <Text style={styles.title}>
              {patientInfo.firstName}'s Information
            </Text>
            <View style={styles.infoContainer}>
              <Text style={styles.fieldName}>Gender: </Text>
              <Text style={styles.fieldValue}>
                {patientInfo.gender[0].toUpperCase() +
                  patientInfo.gender.slice(1)}
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.fieldName}>Phone No: </Text>
              <Text style={styles.fieldValue}>{patientInfo.phoneNumber}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.fieldName}>Location: </Text>
              <Text
                style={styles.fieldValue}
              >{`${patientInfo.city}, ${patientInfo.state}, ${patientInfo.country}`}</Text>
            </View>
          </View>
        )}

        {/* Patient Profile */}
        {patientInfo && patientProfile && (
          <View style={styles.card}>
            <Text style={styles.title}>{patientInfo.firstName}'s Profile</Text>

            <View style={styles.infoContainer}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.fieldNameProfile}>Blood Group: </Text>
                  <Text style={styles.fieldValue}>
                    {patientProfile.bloodGroup}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.fieldNameProfile}>Height: </Text>
                  <Text
                    style={styles.fieldValue}
                  >{`${patientProfile.height} cm`}</Text>
                </View>
              </View>

              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.fieldNameProfile}>Age: </Text>
                  <Text
                    style={styles.fieldValue}
                  >{`${patientProfile.age} years`}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.fieldNameProfile}>Weight: </Text>
                  <Text
                    style={styles.fieldValue}
                  >{`${patientProfile.weight} lb`}</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.title}>This Week Calories Gained</Text>
          <View style={{ flexDirection: "row" }}>
            <YAxis
              style={{ width: "10%" }}
              numberOfTicks={5}
              data={[0, goal.caloriesGoal]}
              contentInset={{ top: 35, bottom: 35 }}
              svg={{ fontSize: 10, fill: "black" }}
            />
            <StackedBarChart
              gridMax={goal.caloriesGoal}
              gridMin={0}
              style={{ height: 250, width: "90%" }}
              keys={keys}
              colors={colors}
              data={caloriesDayToDay}
              showGrid={false}
              contentInset={{ top: 30, bottom: 30 }}
            />
          </View>

          <XAxis
            style={styles.xAxis}
            data={caloriesDayToDay}
            formatLabel={(value, index) => weekday[caloriesDayToDay[value].day]}
            contentInset={{ left: 60, right: 20 }}
            svg={{ fontSize: 10, fill: "black" }}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>This Week Water Consumption</Text>
          <View style={{ flexDirection: "row" }}>
            <YAxis
              style={{ width: "10%" }}
              data={[0, goal.waterGoal]}
              numberOfTicks={4}
              contentInset={{ top: 35, bottom: 35 }}
              svg={{ fontSize: 10, fill: "black" }}
            />
            <StackedBarChart
              gridMax={goal.waterGoal}
              gridMin={0}
              style={{ height: 250, width: "90%" }}
              keys={waterKeys}
              colors={waterColors}
              data={waterDayToDay}
              showGrid={false}
              contentInset={{ top: 30, bottom: 30 }}
            />
          </View>

          <XAxis
            style={styles.xAxis}
            data={waterDayToDay}
            formatLabel={(value, index) => weekday[waterDayToDay[value].day]}
            contentInset={{ left: 60, right: 20 }}
            svg={{ fontSize: 10, fill: "black" }}
          />
        </View>
 
      </View>
    </ScrollView>
  );
};

export default PatientDeatils;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  title: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "row",
  },
  fieldName: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: "bold",
    width: "30%",
    textAlign: "right",
    marginVertical: 8,
  },
  fieldNameProfile: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: "bold",
    width: "50%",
    textAlign: "right",
    marginVertical: 8,
  },
  fieldValue: {
    marginTop: 9,
    color: Colors.text,
  },
  xAxis: {
    marginTop: -15,
  },
});
