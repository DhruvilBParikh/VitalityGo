import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Table, Rows } from "react-native-table-component";
import AppButton from "../../components/AppButton/AppButton";
import Food from "../../components/Food/Food";
import { useSelector } from "react-redux";
import axios from "axios";
import config from "../../constants/config";

export default function Nutrition({ navigation }) {
  const [totalCalories, setTotalCalories] = useState(0);
  const [allFood, setAllFood] = useState([]);
  const [snackFood, setSnackFood] = useState([]);
  const [breakfastFood, setBreakfastFood] = useState([]);
  const [lunchFood, setLunchFood] = useState([]);
  const [dinnerFood, setDinnerFood] = useState([]);
  const [totalWeight, setTotalWeight] = useState(0);
  const [fatPercentage, setFatPercentage] = useState(0)
  const [carbPercentage, setCarbPercentage] = useState(0)
  const [proteinPercentage, setProteinPercentage] = useState(0)
  const state = useSelector((state) => state);

  const [tableData, setTableData] = useState([
    ["Fat", "20g", "27%"],
    ["Carb", "60g", "30%"],
    ["Protein", "100g", "63%"],
  ]);

  useEffect(() => {
    console.log("user token:", state.token)
    axios
      .get(
        `${config.basepath}/api/users/${state.userData._id}/getDaytoDayGoal`,
        { headers: { Authorization: `Bearer ${state.token}` } }
      )
      .then((response) => {
        console.log(
          "Gained calories response: ",
          response.data.data.totalCalories
        );
        setTotalCalories(response.data.data.totalCalories);
      })
      .catch((err) => {
        console.log("Get total calories error: ", err);
      });
  }, []);

  useEffect(() => {
    console.log("Getting Food Details:::::::::::")
    axios
      .get(
        `${config.basepath}/api/food/${state.userData._id}/getNutritionRecords`,
        { headers: { Authorization: `Bearer ${state.token}` } }
      )
      .then((response) => {
        if (response.status === 200) {
          const snacksArr = [];
          const breakfastArr = [];
          const lunchArr = [];
          const dinnerArr = [];
          console.log(
            "Gained nutrition response length: ",
            response.data.data.length
          );
          console.log(response.data.data.length);
          setAllFood(response.data.data);
          const foodData = response.data.data;
          let totalWeight = 0
          foodData.map((d) => {
            totalWeight += d.weight
            switch (d.mealType) {
              case "Snack":
                snacksArr.push(d);
                break;
              case "Breakfast":
                breakfastArr.push(d);
                break;
              case "Lunch":
                lunchArr.push(d);
                break;
              case "Dinner":
                dinnerArr.push(d);
                break;
              default:
                break;
            }
          });
          setTotalWeight(totalWeight);
          setSnackFood(snacksArr);
          setBreakfastFood(breakfastArr);
          setLunchFood(lunchArr);
          setDinnerFood(dinnerArr);
        }
      })
      .catch((err) => {
        console.log("Get nutrition error: ", err);
      });
  }, []);

  useEffect(() => {
    setFatPercentage(parseInt((totalCalories/3)/totalWeight*100))
    setCarbPercentage(parseInt((totalCalories/4)/totalWeight*100))
    setProteinPercentage(parseInt((totalCalories/2.5)/totalWeight*100))
  },[totalCalories, totalWeight])

  return (
      <View style={styles.container}>
        <ScrollView>
        {/* Calories gained */}
        <View style={{paddingTop:30}}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: Colors.text,
              marginHorizontal: 50,
              textAlign: "center",
            }}
          >
            You gained{" "}
            <Text style={{ color: "#7260BC" }}> {totalCalories} </Text> calories
            today
          </Text>
        </View>

        {/* Summary Graph */}
        <View
          style={{
            marginVertical: 20,
            paddingVertical: 20,
            marginHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-evenly",
            backgroundColor: "white",
            borderRadius: 20,
          }}
        >
          <View>
            <AnimatedCircularProgress
              size={140}
              width={15}
              fill={fatPercentage}
              rotation={0}
              tintColor="#8378FE"
              onAnimationComplete={() => console.log("onAnimationComplete")}
              backgroundColor="#DAD8FB"
              lineCap="round"
            />
            <AnimatedCircularProgress
              size={100}
              width={15}
              fill={carbPercentage}
              rotation={0}
              tintColor="#948BFD"
              onAnimationComplete={() => console.log("onAnimationComplete")}
              backgroundColor="#DAD8FB"
              lineCap="round"
              style={{ position: "absolute", top: 20, left: 20 }}
            />
            <AnimatedCircularProgress
              size={60}
              width={15}
              fill={proteinPercentage}
              rotation={0}
              tintColor="#A59EFD"
              onAnimationComplete={() => console.log("onAnimationComplete")}
              backgroundColor="#DAD8FB"
              lineCap="round"
              style={{ position: "absolute", top: 40, left: 40 }}
            />
          </View>
          <View style={{ justifyContent: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableWithoutFeedback
                style={{
                  backgroundColor: "#8378FE",
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                }}
              />
              <Text style={{ color: "#8378FE", marginLeft: 10 }}>Fat {fatPercentage}%</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableWithoutFeedback
                style={{
                  backgroundColor: "#948BFD",
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  marginTop: 20,
                }}
              />
              <Text style={{ color: "#948BFD", marginTop: 20, marginLeft: 10 }}>
              Carb {carbPercentage}%
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableWithoutFeedback
                style={{
                  backgroundColor: "#A59EFD",
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  marginTop: 20,
                }}
              />
              <Text style={{ color: "#A59EFD", marginTop: 20, marginLeft: 10 }}>
              Protien {proteinPercentage}%
              </Text>
            </View>
          </View>
        </View>

        <Table
          borderStyle={{ borderColor: "#000" }}
          style={{ justifyContent: "space-around" }}
        >
          <Rows
            data={[
              ["Fat", parseInt(totalCalories/3)+"g", fatPercentage+"%"],
              ["Carb", parseInt(totalCalories/4)+"g", carbPercentage+"%"],
              ["Protein", parseInt(totalCalories/2.5)+"g", proteinPercentage+"%"],
            ]}
            textStyle={styles.text}
            style={{
              borderBottomWidth: 1,
              paddingLeft: 60,
              borderColor: Colors.text,
            }}
          />
        </Table>


        {breakfastFood.length > 0 && (
          <View style={styles.footContainer}>
            <Text
              style={{ fontWeight: "bold", fontSize: 25, color: Colors.text }}
            >
              Breakfast
          </Text>
            {/* List */}
            {breakfastFood.map((f) =>
              (
                <Food key={f.food.foodName} food={f} />
              )
            )}
          </View>
        )}

        {lunchFood.length > 0 && (
          <View style={styles.footContainer}>
            <Text
              style={{ fontWeight: "bold", fontSize: 25, color: Colors.text }}
            >
              Lunch
          </Text>
            {/* List */}
            {lunchFood.map((f) =>
              (
                <Food key={f.food.foodName} food={f} />
              )
            )}
          </View>
        )}

        {snackFood.length > 0 && (
          <View style={styles.footContainer}>
            <Text
              style={{ fontWeight: "bold", fontSize: 25, color: Colors.text }}
            >
              Snacks
          </Text>
            {/* List */}
            {snackFood.map((f) =>
              (
                <Food key={f.food.foodName} food={f} />
              )
            )}
          </View>
        )}

        {dinnerFood.length > 0 && (
          <View style={styles.footContainer}>
            <Text
              style={{ fontWeight: "bold", fontSize: 25, color: Colors.text }}
            >
              Dinner
          </Text>
            {/* List */}
            {dinnerFood.map((f) =>
              (
                <Food key={f.food.foodName} food={f} />
              )
            )}
          </View>
        )}

        <View style={{ alignItems: "center" }}>
          <AppButton
            title="Add Food"
            clickHandler={() => navigation.navigate("AddFood")}
          />
        </View>
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: Colors.background
  },
  summaryContainer: {
    width: "100%",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: Colors.text,
    justifyContent: "space-evenly",
  },
  summaryText: {
    color: Colors.text,
    fontSize: 15,
    paddingVertical: 10,
  },
  tableContainer: {
    paddingTop: 30,
    backgroundColor: Colors.background,
  },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 10, fontSize: 18, color: Colors.text },
  footContainer: {
    backgroundColor: "white",
    marginTop: 30,
    padding: 15,
    borderRadius: 20,
    marginHorizontal: 10,
  },
});
