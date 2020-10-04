import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function ExternalAuth(props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>{props.title}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/google.png")}
          style={styles.image}
        />
        <Image
          source={require("../../assets/images/facebook.png")}
          style={styles.image}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    width: "100%",
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
  },
  imageContainer: {
    paddingVertical: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  image: {
    width: 50,
    height: 50,
  },
});
