import "react-native-gesture-handler";
import React from "react";
import { Image, View, Text } from "react-native";
import HeaderTitle from './components/Header/HeaderTitle'
import Color from './constants/colors'
import Options from './constants/options'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GetStarted from "./views/GetStarted/GetStarted";
import UserType from "./views/SignUp/UserType";
import PersonalInformation from "./views/SignUp/PersonalInformation";
import Gender from "./views/SignUp/Gender";
import ProfilePictureMale from "./views/SignUp/ProfilePictureMale";
import ProfilePictureFemale from "./views/SignUp/ProfilePictureFemale";
import Login from "./views/Login/Login";
import Home from "./views/Home/Home";
import Nutrition from "./views/Nutrition/Nutrition";
import Water from "./views/Water/Water";
import ECG from "./views/ECG/ECG";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="Login" component={Login} options={Options.signUpHeaderOptions}/>
        <Stack.Screen name="UserType" component={UserType} options={Options.signUpHeaderOptions} />
        <Stack.Screen name="PersonalInformation" component={PersonalInformation} options={Options.signUpHeaderOptions} />
        <Stack.Screen name="Gender" component={Gender} options={Options.signUpHeaderOptions} />
        <Stack.Screen name="ProfilePictureMale" component={ProfilePictureMale} options={Options.signUpHeaderOptions} />
        <Stack.Screen name="ProfilePictureFemale" component={ProfilePictureFemale} options={Options.signUpHeaderOptions}/>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Nutrition" component={Nutrition} />
        <Stack.Screen name="Water" component={Water} />
        <Stack.Screen name="ECG" component={ECG} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}