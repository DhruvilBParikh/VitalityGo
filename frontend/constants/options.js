import Colors from "./colors";
import React from "react";
import { Image } from "react-native";
import HeaderTitle from "../components/Header/HeaderTitle";
import HomeHeader from "../components/Header/HomeHeader";
import NutritionHeader from "../components/Header/NutritionHeader";
import ECGHeader from "../components/Header/ECGHeader";
import HydrationHeader from "../components/Header/HydrationHeader";
import AddEmergencyHeader from "../components/Header/AddEmergencyHeader";
import EditProfileHeader from "../components/Header/EditProfileHeader";
import NotificationHeader from "../components/Header/NotificationHeader";

export default {
  signUpHeaderOptions: {
    headerShown: true,
    headerBackImage: () => (
      <Image
        style={{ marginLeft: 10 }}
        source={require("../assets/images/back-button.png")}
      />
    ),
    headerTitle: () => <HeaderTitle />,
    headerStyle: { height: 120, backgroundColor: Colors.background },
  },
  homeHeaderOptions: {
    headerShown: true,
    headerBackImage: () => (
      <Image
        style={{ marginLeft: 10 }}
        source={require("../assets/images/back-button.png")}
      />
    ),
    headerTitle: () => <HomeHeader />,
    headerStyle: { height: 120, backgroundColor: Colors.background },
  },
  nutritionHeaderOptions: {
    headerShown: true,
    headerBackImage: () => (
      <Image
        style={{ marginLeft: 10 }}
        source={require("../assets/images/back-button.png")}
      />
    ),
    headerTitle: () => <NutritionHeader />,
    headerStyle: { height: 120, backgroundColor: Colors.background },
  },
  ecgHeaderOptions: {
    headerShown: true,
    headerBackImage: () => (
      <Image
        style={{ marginLeft: 10 }}
        source={require("../assets/images/back-button.png")}
      />
    ),
    headerTitle: () => <ECGHeader />,
    headerStyle: { height: 120, backgroundColor: Colors.background },
  },
  hydrationHeaderOptions: {
    headerShown: true,
    headerBackImage: () => (
      <Image
        style={{ marginLeft: 10 }}
        source={require("../assets/images/back-button.png")}
      />
    ),
    headerTitle: () => <HydrationHeader />,
    headerStyle: { height: 120, backgroundColor: Colors.background },
  },
  addEmergencyHeaderOptions: {
    headerShown: true,
    headerBackImage: () => (
      <Image
        style={{ marginLeft: 10 }}
        source={require("../assets/images/back-button.png")}
      />
    ),
    headerTitle: () => <AddEmergencyHeader />,
    headerStyle: { height: 120, backgroundColor: Colors.background },
  },
  editProfileHeaderOptions: {
    headerShown: true,
    headerBackImage: () => (
      <Image
        style={{ marginLeft: 10 }}
        source={require("../assets/images/back-button.png")}
      />
    ),
    headerTitle: () => <EditProfileHeader />,
    headerStyle: { height: 120, backgroundColor: Colors.background },
  },
  notificationHeaderOptions: {
    headerShown: true,
    headerBackImage: () => (
      <Image
        style={{ marginLeft: 10 }}
        source={require("../assets/images/back-button.png")}
      />
    ),
    headerTitle: () => <NotificationHeader />,
    headerStyle: { height: 120, backgroundColor: Colors.background },
  },
};
