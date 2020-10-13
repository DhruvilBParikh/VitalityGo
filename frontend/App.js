import "react-native-gesture-handler";
import React from "react";
import Options from "./constants/options";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
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

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
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
        <Stack.Screen name="Water" component={Water} />
        <Stack.Screen
          name="ECG"
          component={ECG}
          options={Options.ecgHeaderOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
