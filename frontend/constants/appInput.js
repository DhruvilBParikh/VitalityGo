import { StyleSheet } from "react-native";
import Colors from "../constants/colors";

const appInputStyle = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "75%",
    marginTop: 20,
    marginBottom: 20,
    height: 40,
    alignItems: "center",
    paddingLeft: 10,
    flexDirection: "row",
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
  },
  image: {
    width: 25,
    height: 25,
  },
  placeholder: {
    marginLeft: 15,
    paddingHorizontal: 5,
    fontSize: 15,
    color: Colors.text,
  },
});

export default appInputStyle;
