import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LocationPermissions from "../experiment/LocationPermissions";
import Int from '../experiment/Int'
import SplashScreen from "../models/SplashScreen";
import TabNavigation from "./TabNavigation";
import HomeScreen from "../models/HomeScreen";
import MapScreen from "../models/MapScreen";

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tab"
          component={TabNavigation}
          options={{ title: "Map View" }}
        /> */}
         <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ title: "Map View" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
