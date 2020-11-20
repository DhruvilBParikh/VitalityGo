import React from "react";
import { View, Text } from "react-native";
import Colors from "../../constants/colors";

const Food = (props) => {
  return (
    <View
      style={{
        margin: 5,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: "#BBADAD",
      }}
    >
      <Text style={{ color: Colors.text, fontSize: 20 }}>
        {props.food.food.foodName} {"\n"}
        <Text style={{ color: "#BBADAD", fontSize: 15 }}>
          {props.food.weight} grams
        </Text>
      </Text>
      <Text style={{ textAlign: "right", color: Colors.text, fontSize: 20 }}>
        {props.food.calories} cal
      </Text>
    </View>
  );
};

export default Food;
