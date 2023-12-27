import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { reverseGeocode } from "../services/reverseGeocode";
import AppContext from "../context/AppContext";

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

  useEffect(() => {
    addLocation();
  }, []);

  const addLocation = () => {
    if (previousLocations.length >= 5) {
      console.log("Length exceeded");
    } else if (intervalRunning) {
      console.log("Another interval is running");
    } else {
      setIntervalRunning(true);
      console.log("Interval started");
      let myInterval = setInterval(async () => {
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
              console.log("Cleared interval", myInterval);
            }
            return newLocations;
          });
        } catch (error) {
          console.error("Error fetching location:", error);
          clearInterval(myInterval);
          setIntervalRunning(false);
          console.log("Cleared interval due to an error", myInterval);
        }
      }, 1000);
    }
  };


  const handleCardPress = (lat: number, lng: number, index?: number) => {
    console.log("index", index);
    navigation.navigate("Map", { latitude: lat, longitude: lng });
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
    addLocation();
  };

  return (
    // previousLocations.length > 0 ? (
    <HomeScreenView
      currentLocation={currentLocation}
      previousLocations={previousLocations}
      refreshFlatlist={refreshFlatlist}
      handleCardPress={handleCardPress}
      removeLocation={removeLocation}
      removeAllLocations={removeAllLocations}
    />
    // ) : (
    //   null
    // )
  );
};

export default HomeScreen;
