import React, { useState, useEffect, useContext } from "react";
import { View, Text, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";

import AppContext from "../context/AppContext";
import { reverseGeocode } from "../services/reverseGeocode";
import { showAndroidToast } from "../utils/toastConfig";
import { toastMessages } from "../utils/toastMessages";

import HomeScreenView from "../views/HomeScreenView";

const HomeScreen = () => {
  const navigation = useNavigation();
  // type locationsType = {
  //   locations: any[]
  // }
  const { locations, setLocations } = useContext(AppContext);

  const payload = {
    latitude: 52.387783,
    longitude: 9.7334394,
  };
  const [count, setCount] = useState(0);
  const [refreshFlatlist, setRefreshFlatList] = useState(false);
  const [intervalRunning, setIntervalRunning] = useState(false);
  const [showListView, setShowListView] = useState(false);
  const [isLocationOn, setLocationOn] = useState(false);

  useEffect(() => {
    turnOnLocation();
    // addLocation();
  }, []);

  type message = {
    text1: string;
    text2: string;
    type: string;
  };

  const showToast = (message: message) => {
    console.log(message.text1);
    Platform.OS === "android"
      ? showAndroidToast(message.text1)
      : Toast.show(message);
  };

  const checkIsLocationOn = async () => {
    let locationStatus = await Location.hasServicesEnabledAsync();
    return locationStatus;
  };

  const turnOnLocation = async () => {
    try {
      let locationStatus = await Location.enableNetworkProviderAsync(); // This return null if location enables
      if (locationStatus == null) {
        setShowListView(true);
        setLocationOn(true);
        addLocation();
      }
    } catch (error) {
      console.log("Error in enabling location:", error);
    }
  };

  const addLocation = async () => {
    if (intervalRunning) {
      console.log("Another interval is running");
    } else {
      setIntervalRunning(true);
      console.log("Interval started");
      await checkIsLocationOn() && showToast(toastMessages.startedTrackingLocation);
      let myInterval = setInterval(async () => {
        // Confirming location is on everytime before tracking
        if (await checkIsLocationOn()) {
          try {
            const newLocation: any = await reverseGeocode({
              latitude: 18.519397,
              longitude: 73.8553399,
            });
            setLocations((prevLocations) => {
              const newLocations = [newLocation, ...prevLocations];
              // Evaluating the length to determine wheather to add a location or retain the state as it is
              if (newLocations.length > 5) {
                clearInterval(myInterval);
                setIntervalRunning(false);
                showToast(toastMessages.stoppedTrackingLocation);
                return prevLocations;
              } else {
                showToast(toastMessages.addedLocation);
                return newLocations;
              }
            });
          } catch (error) {
            console.error("Error fetching location:", error);
            clearInterval(myInterval);
            setIntervalRunning(false);
            console.log("Cleared interval due to an error", myInterval);
          }
        } else {
          clearInterval(myInterval);
          setIntervalRunning(false);
          setLocationOn(false);
          showToast(toastMessages.turnedOffLocation);
        }
      }, 1000);
    }
  };

  const handleCardPress = (lat: number, lng: number, index?: number) => {
    navigation.navigate("Map", { latitude: lat, longitude: lng });
  };

  const handleSeeAllLocation = () => {
    navigation.navigate("Map");
  };

  const removeLocation = (index: number) => {
    console.log("index", index);
    let localArray = locations;
    localArray.splice(index, 1);
    setLocations(localArray);
    setRefreshFlatList(!refreshFlatlist);
    showToast(toastMessages.removedLocation);
    addLocation();
  };

  const removeAllLocations = () => {
    let localArray = locations;
    localArray.splice(0);
    setLocations(localArray);
    setRefreshFlatList(!refreshFlatlist);
    showToast(toastMessages.removedAllLocation);
    addLocation();
  };

  return (
    <HomeScreenView
      showListView={showListView}
      locations={locations}
      refreshFlatlist={refreshFlatlist}
      islocationOn={isLocationOn}
      turnOnLocation={turnOnLocation}
      handleCardPress={handleCardPress}
      removeLocation={removeLocation}
      removeAllLocations={removeAllLocations}
      handleSeeAllLocation={handleSeeAllLocation}
    />
  );
};

export default HomeScreen;
