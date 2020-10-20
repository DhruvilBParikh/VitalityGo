import "react-native-gesture-handler";
import React, { useEffect, useReducer, useMemo } from "react";
import Options from "./constants/options";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthContext } from "./AuthContext.js";
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
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          console.log("Restore token called");
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          console.log("Sign in called");
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          console.log("Sign out called");
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        // Restoring token failed
        console.log(e);
      }
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        console.log("Sign in data: ", data);
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        console.log("Sign up data: ", data);
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {state.userToken !== null ? (
            <>
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
            </>
          ) : (
            <>
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
            </>
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
