import AsyncStorage from "@react-native-community/async-storage";

export default logout = () => {
  AsyncStorage.clear(() => console.log("async login details removed"));
};
