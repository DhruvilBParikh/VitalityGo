import AsyncStorage from "@react-native-community/async-storage";

export default getSessionObject = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@user");
    console.log("in userSession: jsonValue:::", jsonValue);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log("Error reading user login object: ", e);
  }
};
