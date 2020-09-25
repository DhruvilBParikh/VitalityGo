import { StyleSheet } from "react-native";
import Colors from "../constants/colors";

const appButtonStyle = StyleSheet.create({
  container: {
    margin: 20,
    width: "70%",
  },
  button: {
    backgroundColor: Colors.accent,
    paddingVertical: 20,
    borderRadius: 30,
  },
  text: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default appButtonStyle;
