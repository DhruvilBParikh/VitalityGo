import { StyleSheet } from "react-native";
import Colors from "../constants/colors";

const appInputStyle = StyleSheet.create({
  container: {
    backgroundColor: "white",
    color: "grey",
    width: "75%",
    marginTop: 20,
    marginBottom: 20,
    height: 40,
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 25,
    flexDirection: "row",
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    overflow: "hidden",
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
  picker: {
    // backgroundColor: "red",
    width: "100%",
    marginLeft: 10,
    padding: 0,
    color: "rgb(160, 160, 160)",
  },
  datePicker: {
    backgroundColor: "red",
  },
  pickerItem: {
    textAlign: "center",
    backgroundColor: "red",
    color: "blue",
  },
});

export default appInputStyle;
