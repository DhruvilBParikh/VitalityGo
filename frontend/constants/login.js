import AsyncStorage from "@react-native-community/async-storage";

export default login = async (data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem("@user", jsonValue);
    console.log("async login details stored");
  } catch (e) {
    // saving error
    console.log(`Error storing login details: ${e}`);
  }
};
