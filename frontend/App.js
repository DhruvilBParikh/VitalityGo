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
        case "RESTORE_USER":
          console.log("Restore user called");
          return {
            ...prevState,
            userData: action.userData,
            isLoading: false,
          };
        case "SIGN_IN":
          console.log("Sign in called");
          return {
            ...prevState,
            isSignout: false,
            userData: action.userData,
          };
        case "SIGN_OUT":
          console.log("Sign out called");
          return {
            ...prevState,
            isSignout: true,
            userData: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userData: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userData;
      try {
        userData = await AsyncStorage.getItem("userData");
      } catch (e) {
        console.log("Error restoing user: ", e);
      }
      dispatch({ type: "RESTORE_USER", userData });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (userData) => {
        console.log("Authcontext sign in data: ", userData);
        dispatch({ type: "SIGN_IN", userData });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (userData) => {
        console.log("Authcontext sign up data: ", userData);
        dispatch({ type: "SIGN_IN", userData });
      },
    }),
    []
  );

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {state.userData !== null ? (
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
