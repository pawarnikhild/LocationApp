import React, { useEffect } from "react";
import { Alert, BackHandler, Linking } from "react-native";
import * as Location from "expo-location";

import SplashScreenView from "../views/SplashScreenView";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    let permissionStatus = await Location.getForegroundPermissionsAsync();
    // console.log("permissionStatus in CLP ", permissionStatus);
    if (permissionStatus.granted === true) {
      console.log("Location permission granted");
      setTimeout(() => {
        navigation.replace("Tab");
      }, 2000);
    } else {
      requestLocationPermission();
    }
  };

  const requestLocationPermission = async () => {
    let permissionStatus = await Location.requestForegroundPermissionsAsync();
    console.log("permissionStatus in RLP", { permissionStatus });
    if (permissionStatus.granted === true) {
      console.log("Location permission granted");
      setTimeout(() => {
        navigation.replace("Tab");
      }, 2000);
    } else if (
      permissionStatus.granted === false &&
      permissionStatus.canAskAgain === true
    ) {
      showPermissionDeniedOnceAlert();
    } else {
      showPermissionDeniedTwiceAlert();
    }
  };

  const showPermissionDeniedOnceAlert = () => {
    Alert.alert(
      "Permission required",
      "Location permission in required to run this app.",
      [
        {
          text: "Ok",
          onPress: () => requestLocationPermission(),
        },
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: true,
        onDismiss: () => BackHandler.exitApp(),
      }
    );
  };

  const showPermissionDeniedTwiceAlert = () => {
    Alert.alert(
      "Permission required",
      "It seems you permanently declined location permission. You can go to app settings to grant it",
      [
        {
          text: "Go to Settings",
          onPress: () => Linking.openSettings(),
        },
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: true,
        onDismiss: () => BackHandler.exitApp(),
      }
    );
  };
  return <SplashScreenView />;
};

export default SplashScreen;
