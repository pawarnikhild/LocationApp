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
  //   currentLocation: {},
  //   previousLocations: any[]
  // }
  const {
    currentLocation,
    previousLocations,
    setCurrentLocation,
    setPreviousLocations,
  } = useContext(AppContext);

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
    text1: string,
    text2: string,
    type: string
  }

  const showToast = (message:message) => {
    console.log(message)
    Platform.OS === "android"
    ? showAndroidToast(message.text1) 
    : Toast.show(message); 
  }

  const turnOnLocation = async () => {
    try {
      let locationStatus = await Location.enableNetworkProviderAsync();
      // console.log("Location status while turning on location:", locationStatus); // This return null if location enables
      if (locationStatus == null) {
        setShowListView(true);
        setLocationOn(true);
        addLocation();
      }
    } catch (error) {
      console.log("Error in enabling location:", error);
    }
  };

  const addLocation = () => {
    if (previousLocations.length >= 5) {
      console.log("Length exceeded");
    } else if (intervalRunning) {
      console.log("Another interval is running");
    } else {
      setIntervalRunning(true);
      console.log("Interval started");
      showToast(toastMessages.startedTrackingLocation)
      let myInterval = setInterval(async () => {
        let locationStatus = await Location.hasServicesEnabledAsync();
        // console.log("Location status in Interval:", locationStatus);
        // This if is for checking is location on everytime before adding location to array
        if (locationStatus) {
          try {
            const newLocation: any = await reverseGeocode({
              latitude: 18.519397,
              longitude: 73.8553399,
            });
            setPreviousLocations((prevLocations) => {
              const newLocations = [newLocation, ...prevLocations];
              // Check the length after updating the state
              if (newLocations.length >= 5) {
                clearInterval(myInterval);
                setIntervalRunning(false);
                console.log(
                  "Location array lenght fulfilled, cleared interval",
                  myInterval
                );
                showToast(toastMessages.stoppedTrackingLocation)
              }
              showToast(toastMessages.addedLocation)
              return newLocations;
            });
          } catch (error) {
            console.error("Error fetching location:", error);
            clearInterval(myInterval);
            setIntervalRunning(false);
            console.log("Cleared interval due to an error", myInterval);
          }
        } else {
          console.log("Location turned off, hence cleared interval", myInterval);
          showToast(toastMessages.turnedOffLocation)
          clearInterval(myInterval);
          setIntervalRunning(false);
          setLocationOn(false);
        }
      }, 1000);
    }
  };

  const handleCardPress = (lat: number, lng: number, index?: number) => {
    console.log("index", index);
    navigation.navigate("Map", { latitude: lat, longitude: lng });
    // console.log("card pressed")
  };

  const handleSeeAllLocation = () => {
    navigation.navigate("Map");
    // console.log("card pressed")
  };


  const removeLocation = (index: number) => {
    console.log("removeLocation pressed");
    console.log("index", index);
    let localArray = previousLocations;
    console.log("Before:", localArray);
    // localArray.filter(obj => obj.index != index)
    localArray.splice(index, 1);
    setPreviousLocations(localArray);
    console.log("After:", localArray);
    setRefreshFlatList(!refreshFlatlist);
    showToast(toastMessages.removedLocation)
    addLocation();
  };

  const removeAllLocations = () => {
    let localArray = previousLocations;
    localArray.splice(0, localArray.length);
    if (!localArray.length) {
      setPreviousLocations(localArray);
      console.log("Deleted all previous locations");
    } else {
      console.log("Error in deleting locations");
    }
    setRefreshFlatList(!refreshFlatlist);
    showToast(toastMessages.removedAllLocation)
    addLocation();
  };
  // console.log('showListView', showListView)
  // console.log('CCCC',isLocationOn)

  return (
    // previousLocations.length > 0 ? (
    <HomeScreenView
      showListView={showListView}
      currentLocation={currentLocation}
      previousLocations={previousLocations}
      refreshFlatlist={refreshFlatlist}
      islocationOn={isLocationOn}
      turnOnLocation={turnOnLocation}
      handleCardPress={handleCardPress}
      removeLocation={removeLocation}
      removeAllLocations={removeAllLocations}
      handleSeeAllLocation={handleSeeAllLocation}
    />
    // ) : (
    //   null
    // )
  );
};

export default HomeScreen;
