import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../constants/colors";

const AddFoodModal = ({ navigation }) => {
  const [mealType, setMealType] = useState(null);
  const [food, setFood] = useState(null);
  const mealTypes = ["Snack", "Breakfast", "Lunch", "Dinner"];
  const mealItems = [
    "Milk",
    "Cereal",
    "Fruits",
    "Salad",
    "Rice",
    "Pasta",
    "Chicken",
  ];

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
          <View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.mealType}
              onPress={() => setMealType("Dinner")}
            >
              <Image
                source={require("../../assets/images/select-button.png")}
                style={{
                  ...styles.icon,
                  tintColor:
                    mealType === "Dinner" ? Colors.accent : Colors.disabled,
                }}
              />
              <Text style={styles.text}>Dinner</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.mealItemsContainer}>
          <View>
            {mealItems.map((f) => (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.mealItem}
                onPress={() => setFood(f)}
                key={f}
              >
                <Text style={styles.text}>{f}</Text>
                <Image
                  source={require("../../assets/images/select-button.png")}
                  style={{
                    ...styles.icon,
                    padding: 0,
                    tintColor: food === f ? Colors.accent : Colors.disabled,
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Button title="Close" onPress={() => navigation.pop()} />
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
