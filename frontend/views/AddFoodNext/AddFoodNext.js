import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import ValidationMsg from "../../components/ValidationMsg/ValidationMsg";
import appInputStyle from "../../constants/appInput";

const AddFoodNext = ({ route, navigation }) => {
  const [food, setFood] = useState(route.params.food.item);
  const [calories, setCalories] = useState(route.params.food.calories);
  const [weight, setWeight] = useState(route.params.food.weight);

  const [showFoodError, setShowFoodError] = useState(false);
  const [showCaloriesError, setShowCaloriesError] = useState(false);
  const [showWeightError, setShowWeightError] = useState(false);

  const addFoodHandler = () => {
    let navigate = true;

    if (food.trim().length === 0) {
      navigate = false;
      setShowFoodError(true);
    } else {
      setShowFoodError(false);
    }

    if (calories.trim().length === 0) {
      navigate = false;
      setShowCaloriesError(true);
    } else {
      setShowCaloriesError(false);
    }

    if (weight.trim().length === 0) {
      navigate = false;
      setShowWeightError(true);
    } else {
      setShowWeightError(false);
    }

    if (navigate) {
      const data = {
        foodName: food,
        mealType: route.params.meal,
        calories,
        weight,
      };
      // call api
      console.log("food data: ", data);
      navigation.navigate("Nutrition");
    }
  };

  return (
    <View style={styles.container}>
      {/* title */}
      <Text style={styles.title}>Add your food</Text>

      {/* mealtype */}
      <Text style={styles.subTitle}>{route.params.meal}</Text>

      {/* food item */}
      <View style={appInputStyle.container}>
        <Text>Item:</Text>
        <TextInput
          value={food}
          onChangeText={(text) => setFood(text)}
          style={appInputStyle.placeholder}
        />
      </View>

      {showFoodError && <ValidationMsg message="Please enter a food item" />}

      {/* Calories */}
      <View style={appInputStyle.container}>
        <Text>Calories:</Text>
        <TextInput
          keyboardType="number-pad"
          value={calories}
          onChangeText={(text) => setCalories(text)}
          style={appInputStyle.placeholder}
        />
      </View>

      {showCaloriesError && <ValidationMsg message="Please enter calories" />}

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
