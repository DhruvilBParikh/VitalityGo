import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../constants/colors";
import AppButton from "../../components/AppButton/AppButton";
import ValidationMsg from "../../components/ValidationMsg/ValidationMsg";
import { useSelector } from "react-redux";
import axios from "axios";
import config from "../../constants/config";

const AddFoodModal = ({ navigation }) => {
  const [mealType, setMealType] = useState(null);
  const [food, setFood] = useState(null);
  const [showErrorMsg, setShowErrorMSg] = useState(false);
  const [mealItems, setMealItems] = useState([
    { foodName: "Custom", defaultCalories: 200 },
  ]);

  const state = useSelector((state) => state);

  const mealTypes = ["Breakfast", "Lunch", "Snack", "Dinner"];

  const handleNavigation = () => {
    if (mealType === null || food === null) {
      setShowErrorMSg(true);
      return;
    } else {
      setShowErrorMSg(false);
      navigation.navigate("AddFoodNext", {
        meal: mealType,
        food,
      });
    }
  };

  useEffect(() => {
    axios
      .get(`${config.basepath}/api/food/getFood`, {
        headers: { Authorization: `Bearer ${state.token}` },
      })
      .then((response) => {
        console.log("Food response length: ", response.data.data.length);
        setMealItems([...mealItems, ...response.data.data]);
      })
      .catch((err) => {
        console.log("Get food error: ", err);
      });
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/add-food.png")}
          style={styles.image}
        />
        <Text style={styles.title}>Choose your food</Text>
        <Text style={styles.subTitle}>
          {`Select your meal and food \n that you consumed today`}
        </Text>
        <View style={styles.mealTypes}>
          {mealTypes.map((m) => (
            <View key={m}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.mealType}
                onPress={() => setMealType(m)}
              >
                <Image
                  source={require("../../assets/images/select-button.png")}
                  style={{
                    ...styles.icon,
                    tintColor: mealType === m ? Colors.accent : Colors.disabled,
                  }}
                />
                <Text style={styles.text}>{m}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.mealItemsContainer}>
          <View>
            {mealItems.map((f) => (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.mealItem}
                onPress={() => setFood(f)}
                key={f.foodName}
              >
                <Text style={styles.text}>{f.foodName}</Text>
                <Image
                  source={require("../../assets/images/select-button.png")}
                  style={{
                    ...styles.icon,
                    padding: 0,
                    tintColor:
                      food && food.foodName === f.foodName
                        ? Colors.accent
                        : Colors.disabled,
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {showErrorMsg && (
          <ValidationMsg message="Please select a meal and item" />
        )}
        <AppButton title="Next" clickHandler={handleNavigation} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
    display: "flex",
    alignItems: "center",
  },
  image: {
    width: 180,
    height: 180,
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
  mealTypes: {
    alignSelf: "stretch",
    marginVertical: 5,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  mealType: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
    padding: 15,
    tintColor: "grey",
  },
  text: {
    fontSize: 18,
  },
  mealItemsContainer: {
    marginBottom: 15,
    alignSelf: "stretch",
  },
  mealItem: {
    padding: 13,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
});

export default AddFoodModal;
