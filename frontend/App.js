import "react-native-gesture-handler";
import React, { useEffect } from "react";

import AsyncStorage from "@react-native-community/async-storage";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { restoreUser } from "./redux/action/action.js";

import Options from "./constants/options";

import GetStarted from "./views/GetStarted/GetStarted";
import UserType from "./views/SignUp/UserType";
import Credential from "./views/SignUp/Credential";
import PersonalInformation from "./views/SignUp/PersonalInformation";
import Gender from "./views/SignUp/Gender";
import ProfilePictureMale from "./views/SignUp/ProfilePictureMale";
import ProfilePictureFemale from "./views/SignUp/ProfilePictureFemale";
import Login from "./views/Login/Login";
import Home from "./views/Home/Home";
import Nutrition from "./views/Nutrition/Nutrition";
import Water from "./views/Water/Water";
import ECG from "./views/ECG/ECG";
import ContactInfo from "./views/SignUp/ContactInfo";
import AddFoodModal from "./views/AddFoodModal/AddFoodModal";
import AddEmergency from "./views/EmergencyContact/AddEmergency";
import AddFoodNext from "./views/AddFoodNext/AddFoodNext.js";
import Toast from "react-native-toast-message";
import EditProfile from "./views/EditProfile/EditProfile.js";

const Stack = createStackNavigator();

export default function App() {
  // const state = useSelector((state) => state);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const bootstrapAsync = async () => {
  //     let userData;
  //     try {
  //       userData = await AsyncStorage.getItem("userData");
  //       console.log("Async userData: ", userData);
  //     } catch (e) {
  //       console.log("Error restoing user: ", e);
  //     }
  //     dispatch(restoreUser(userData));
  //   };
  //   bootstrapAsync();
  // }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="GetStarted"
          screenOptions={{ headerShown: false }}
        >
          {/* {state.userData !== null ? (
          <> */}
          <Stack.Screen
            name="Home"
            component={Home}
            options={Options.homeHeaderOptions}
          />
          <Stack.Screen
            name="Nutrition"
            component={Nutrition}
            options={Options.nutritionHeaderOptions}
          />
          <Stack.Screen name="AddFood" component={AddFoodModal} />
          <Stack.Screen name="AddFoodNext" component={AddFoodNext} />
          <Stack.Screen
            name="Water"
            component={Water}
            options={Options.hydrationHeaderOptions}
          />
          <Stack.Screen
            name="ECG"
            component={ECG}
            options={Options.ecgHeaderOptions}
          />
          <Stack.Screen
            name="AddEmergency"
            component={AddEmergency}
            options={Options.addEmergencyHeaderOptions}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={Options.editProfileHeaderOptions}
          />
          {/* </>
        ) : (
          <> */}
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen
            name="Login"
            component={Login}
            options={Options.signUpHeaderOptions}
          />
          <Stack.Screen
            name="UserType"
            component={UserType}
            options={Options.signUpHeaderOptions}
          />
          <Stack.Screen
            name="Credential"
            component={Credential}
            options={Options.signUpHeaderOptions}
          />
          <Stack.Screen
            name="ContactInfo"
            component={ContactInfo}
            options={Options.signUpHeaderOptions}
          />
          <Stack.Screen
            name="PersonalInformation"
            component={PersonalInformation}
            options={Options.signUpHeaderOptions}
          />
          <Stack.Screen
            name="Gender"
            component={Gender}
            options={Options.signUpHeaderOptions}
          />
          <Stack.Screen
            name="ProfilePictureMale"
            component={ProfilePictureMale}
            options={Options.signUpHeaderOptions}
          />
          <Stack.Screen
            name="ProfilePictureFemale"
            component={ProfilePictureFemale}
            options={Options.signUpHeaderOptions}
          />
          {/* </>
        )} */}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}
