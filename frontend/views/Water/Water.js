import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "../../constants/colors";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import axios from "axios";
import config from "../../constants/config";

export default function Water() {
  const state = useSelector((state) => state);
  const goal = state.patientData.waterGoal;
  const [progress, setProgress] = useState(0);
  const [bestPerformance, setBestPerformance] = useState(0);
  const [worstPerformance, setWorstPerformance] = useState(0);

  const updateWaterGlass = () => {
    const data = {
      totalCalories: 0,
      totalWaterGlasses: 1,
    };
    axios
      .put(
        `${config.basepath}/api/users/${state.userData._id}/updateDayToDayGoal`,
        data,
        { headers: { Authorization: `Bearer ${state.token}` } }
      )
      .then((response) => {
        if (response.status === 200) {
          setProgress((prev) => prev + 1);
          console.log("Add glass response: ", response.data.msg);
        }
      })
      .catch((err) => {
        console.log("Add glass error: ", err);
      });
  };

  useEffect(() => {
    axios
      .get(
        `${config.basepath}/api/users/${state.userData._id}/getDaytoDayGoal`,
        { headers: { Authorization: `Bearer ${state.token}` } }
      )
      .then((response) => {
        console.log(
          "Water glasses response: ",
          response.data.data.totalWaterGlasses
        );
        setProgress(response.data.data.totalWaterGlasses);
      })
      .catch((err) => {
        console.log("Water glasses error: ", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${config.basepath}/api/users/${state.userData._id}/getWaterPerformance`,
        { headers: { Authorization: `Bearer ${state.token}` } }
      )
      .then((response) => {
        console.log("Water performance response: ", response.data.data);
        setBestPerformance(response.data.data.bestPerformance);
        setWorstPerformance(response.data.data.worstPerformance);
      })
      .catch((err) => {
        console.log("Water performance error: ", err);
      });
  }, []);

  useEffect(() => {
    if (progress > bestPerformance) {
      setBestPerformance(progress);
    }
  }, [progress]);

  return (
    <ScrollView style={styles.container}>
      {/* no of glasses */}
      <View>
        <Text style={styles.headText}>
          You drank <Text style={{ color: "#7260BC" }}> {progress} </Text>{" "}
          glasses of water
        </Text>
      </View>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.glassViewContainer}>
          {[...Array(Math.ceil(goal / 2))].map((x, i) => {
            return i < progress ? (
              <Image
                key={i}
                source={require("../../assets/images/filled-glass.png")}
              />
            ) : (
              <TouchableOpacity key={i} onPress={updateWaterGlass}>
                <Image source={require("../../assets/images/add-glass.png")} />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.glassViewContainer}>
          {[...Array(Math.floor(goal / 2))].map((x, i) => {
            return i + Math.ceil(goal / 2) < progress ? (
              <Image
                key={i + Math.ceil(goal / 2)}
                source={require("../../assets/images/filled-glass.png")}
              />
            ) : (
              <TouchableOpacity
                key={i + Math.ceil(goal / 2)}
                onPress={updateWaterGlass}
              >
                <Image source={require("../../assets/images/add-glass.png")} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Summary */}
      <View style={styles.summaryContainer}>
        <View
          style={{
            borderRightWidth: 2,
            borderRightColor: "#BBADAD",
            width: "50%",
          }}
        >
          <Text style={styles.summaryPrimaryText}>
            {progress * 8} oz{" "}
            <Text style={{ fontSize: 12 }}>(8 oz per glass)</Text>
          </Text>
          <Text style={styles.summarySecondaryText}>Water Drank</Text>
        </View>
        <View style={{ width: "50%", alignItems: "flex-end" }}>
          <Text style={styles.summaryPrimaryText}> {goal} Glasses</Text>
          <Text style={styles.summarySecondaryText}>Daily Goal</Text>
        </View>
      </View>

      {progress < goal ? (
        <View style={[styles.performanceView, { backgroundColor: "#F4DCDC" }]}>
          <Text style={[{ color: "#F68D8D" }, styles.performanceText]}>
            You didn't drink enough water today.
          </Text>
        </View>
      ) : (
        <View style={[styles.performanceView, { backgroundColor: "#9AE58E" }]}>
          <Text style={[{ color: "#2FAB1A" }, styles.performanceText]}>
            You achieved the goal.
          </Text>
        </View>
      )}
      <View style={{ backgroundColor: Colors.white, padding: 10 }}>
        <View
          style={[
            styles.performanceContainer,
            { borderBottomWidth: 1, borderBottomColor: "#BBADAD" },
          ]}
        >
          <Image source={require("../../assets/images/happy.png")} />
          <Text style={styles.summaryPrimaryText}> Best Performance </Text>
          <Text style={styles.summaryPrimaryText}> {bestPerformance} </Text>
        </View>
        <View style={styles.performanceContainer}>
          <Image source={require("../../assets/images/sad.png")} />
          <Text style={styles.summaryPrimaryText}> Worst Performance </Text>
          <Text style={styles.summaryPrimaryText}> {worstPerformance} </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 30, backgroundColor: Colors.background },
  headText: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.text,
    marginHorizontal: 50,
    textAlign: "center",
  },
  progressContainer: {
    marginVertical: 20,
    paddingVertical: 20,
    marginHorizontal: 5,
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    borderRadius: 20,
  },
  glassViewContainer: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  summaryContainer: {
    backgroundColor: "#F4F6FA",
    padding: 20,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  summaryPrimaryText: {
    fontSize: 20,
    color: Colors.text,
  },
  summarySecondaryText: {
    fontSize: 18,
    color: "#BBADAD",
  },
  performanceView: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  performanceText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  performanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    height: 50,
  },
});
