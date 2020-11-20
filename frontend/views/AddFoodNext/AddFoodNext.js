import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import ValidationMsg from "../../components/ValidationMsg/ValidationMsg";
import appInputStyle from "../../constants/appInput";
import { useSelector } from "react-redux";
import axios from "axios";
import config from "../../constants/config";

const AddFoodNext = ({ route, navigation }) => {
  const [food, setFood] = useState(route.params.food.foodName);
  const [weight, setWeight] = useState("100");
  const [calories, setCalories] = useState(
    route.params.food.defaultCalories.toString()
  );
  const [showFoodError, setShowFoodError] = useState(false);
  const [showWeightError, setShowWeightError] = useState(false);
  const state = useSelector((state) => state);

  useEffect(() => {
    if (route.params.food.foodName !== "Custom") {
      const cl = route.params.food.defaultCalories;
      setCalories(((parseInt(weight) * cl) / 100).toFixed(2).toString());
    }
  }, [weight]);

  const addFoodHandler = () => {
    let navigate = true;

    if (food.trim().length === 0) {
      navigate = false;
      setShowFoodError(true);
    } else {
      setShowFoodError(false);
    }

    if (weight.toString().trim().length === 0) {
      navigate = false;
      setShowWeightError(true);
    } else {
      setShowWeightError(false);
    }

    if (navigate) {
      const data = {
        foodName: food,
        mealType: route.params.meal,
        calories: parseFloat(calories),
        weight: parseInt(weight),
      };
      axios
        .put(
          `${config.basepath}/api/food/${state.userData._id}/addFoodRecord`,
          data,
          { headers: { Authorization: `Bearer ${state.token}` } }
        )
        .then((response) => {
          if (response.status === 200) {
            console.log("Add food response: ", response.data.msg);
            const caloriesData = {
              totalCalories: parseFloat(calories),
              totalWaterGlasses: 0
            }
            axios
              .put(
                `${config.basepath}/api/users/${state.userData._id}/updateDayToDayGoal`,
                caloriesData,
                { headers: { Authorization: `Bearer ${state.token}` } }
              )
              .then((response) => {
                if (response.status === 200) {
                  console.log("Update Day To Day response: ", response.data.msg);
                  navigation.pop(2);
                  navigation.replace("Nutrition");
                }
              })
              .catch((err) => {
                console.log("Add food error: ", err);
              });
          }
        })
        .catch((err) => {
          console.log("Add food error: ", err);
        });
    }
  };

  return (
    <View style={styles.container}>
      {/* title */}
      <Text style={styles.title}>Add your food</Text>

      {/* mealtype */}
      <Text style={styles.subTitle}>{route.params.meal}</Text>

      <Text>Please verify item and weight.</Text>

      {/* food item */}
      <View style={appInputStyle.container}>
        <Text>Item:</Text>
        <TextInput
          value={food}
          onChangeText={(text) => setFood(text)}
          style={appInputStyle.placeholder}
          editable={route.params.food.foodName === "Custom"}
        />
      </View>

      {showFoodError && <ValidationMsg message="Please enter a food item" />}

      {/* weight */}
      <View style={appInputStyle.container}>
        <Text>Weight:</Text>
        <TextInput
          keyboardType="number-pad"
          value={weight}
          onChangeText={(text) => setWeight(text)}
          style={appInputStyle.placeholder}
        />
      </View>

      {showWeightError && <ValidationMsg message="Please enter weight" />}

      {/* calories */}
      <View style={appInputStyle.container}>
        <Text>Calories:</Text>
        <TextInput
          keyboardType="number-pad"
          value={calories}
          style={appInputStyle.placeholder}
          editable={route.params.food.foodName === "Custom"}
          onChangeText={(text) => setCalories(text)}
        />
      </View>

      <AppButton title="Add" clickHandler={addFoodHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
    display: "flex",
    alignItems: "center",
  },
  title: {
    marginVertical: 5,
    fontSize: 32,
    fontWeight: "bold",
  },
  subTitle: {
    marginVertical: 5,
    fontSize: 24,
    fontWeight: "bold",
    color: "grey",
  },
});

export default AddFoodNext;
