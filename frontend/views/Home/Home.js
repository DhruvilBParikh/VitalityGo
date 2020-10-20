import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Bar } from "react-native-progress";
import Colors from "../../constants/colors";
import { AuthContext } from "../../AuthContext.js";

export default function Home({ navigation }) {
  const [cal, setCal] = useState(0);
  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {/* Greeting */}
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Greetings, User </Text>
        <Text style={styles.motivationText}>
          Take care of your body. It's the only place you have to live.
        </Text>
      </View>

      {/* Nutrition */}
      <TouchableOpacity
        style={styles.whiteBackground}
        onPress={() => navigation.navigate("Nutrition")}
      >
        <View style={{ width: 100, height: 80, alignItems: "center" }}>
          <Image
            source={require("../../assets/images/home-nutrition.png")}
            style={{ width: 76, height: 75 }}
          />
        </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}> Nutrition </Text>
          <View style={styles.progressContainer}>
            <Text style={{ color: "#BBADAD" }}> 850/1000 cal </Text>
          </View>
          <Bar progress={0.85} width={200} color="#00D7A3" />
        </View>
      </TouchableOpacity>

      {/* Water */}
      <TouchableOpacity
        style={styles.whiteBackground}
        onPress={() => navigation.navigate("Water")}
      >
        <View style={{ width: 100, height: 80, alignItems: "center" }}>
          <Image
            source={require("../../assets/images/home-water.png")}
            style={{ width: 49, height: 71 }}
          />
        </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}> Water </Text>
          <View style={styles.progressContainer}>
            <Text style={{ color: "#BBADAD" }}> 4/8 glasses </Text>
          </View>
          <Bar progress={0.5} width={200} color="#00D7A3" />
        </View>
      </TouchableOpacity>

      {/* ECG */}
      <TouchableOpacity
        style={[styles.whiteBackground, { borderBottomWidth: 1 }]}
        onPress={() => navigation.navigate("ECG")}
      >
        <View style={{ width: 100, height: 80, alignItems: "center" }}>
          <Image
            source={require("../../assets/images/home-ecg.png")}
            style={{ width: 69, height: 72 }}
          />
        </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}> ECG </Text>
          <View style={styles.progressContainer}>
            <Text style={{ color: "#BBADAD" }}> 72 bpm </Text>
            <Text style={{ color: "#BBADAD", fontSize: 12 }}>
              {" "}
              65 bpm resting heart rate{" "}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Button title="Logout" onPress={() => signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "flex-start",
  },
  greetingContainer: {
    marginHorizontal: 45,
    marginVertical: 80,
  },
  greetingText: {
    color: Colors.text,
    fontWeight: "bold",
    fontSize: 30,
  },
  motivationText: {
    marginTop: 20,
    color: Colors.text,
    fontWeight: "bold",
    fontSize: 20,
  },
  whiteBackground: {
    borderTopWidth: 1,
    borderColor: "#474444",
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
  },
  summaryContainer: {
    width: "100%",
    paddingLeft: 20,
  },
  summaryTitle: {
    color: Colors.text,
    fontWeight: "bold",
    fontSize: 20,
  },
  progressContainer: {
    marginTop: 10,
  },
});
