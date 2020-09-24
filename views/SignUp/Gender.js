import React, { useState } from "react";
import { View, Text } from "react-native";

export default function Gender({ navigation }) {
  const [isMale, setIsMale] = useState(true); // set deafualt to null

  return (
    <View>
      <Text
        onPress={() =>
          isMale === true
            ? navigation.navigate("ProfilePictureMale")
            : navigation.navigate("ProfilePictureFemale")
        }
      >
        Continue
      </Text>
    </View>
  );
}
