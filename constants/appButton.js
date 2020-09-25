import { StyleSheet } from "react-native";
import Colors from "../constants/colors";

const appButtonStyle = StyleSheet.create({
  container: {
    display: "flex",
    paddingHorizontal: 20,
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
