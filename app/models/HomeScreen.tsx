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
  const [refreshFlatlist, setRefreshFlatList] = useState(false);

  useEffect(() => {
    // trueOrNot()
    callAPI(false, currentLocation);
    setInterval(() => {
      callAPI(true, currentLocation);
      // moveCurrentToPrevious(currentLocation);
    }, 5000);
    // setInterval()
  }, []);

  // useEffect(() => {
  //   moveCurrentToPrevious(currentLocation);
  // }, [currentLocation]);

  const callAPI = async (param: boolean, currentLocation: any) => {
    let localVariable = await reverseGeocode(payload);
    if (localVariable != null) {
      console.log("localVariable", localVariable);
      setCurrentLocation(localVariable);
      // setPreviousLocations([...previousLocations, localVariable])
      console.log("previousLocations in callAPI before", previousLocations);
      let localArray = previousLocations;
      localArray.push(localVariable);
      setPreviousLocations(localArray);
      console.log("previousLocations in callAPI after", previousLocations);

      console.log("Data fetched successtully");
    } else {
      console.log("Error in getting data");
    }
    if(param) {
      moveCurrentToPrevious(currentLocation);
    }
  };

  const handleCardPress = (lat: number, lng: number, index?: number) => {
    console.log("index", index);
    navigation.navigate("Map", { latitude: lat, longitude: lng });
    // console.log("card pressed")
  };

  const moveCurrentToPrevious = (cLocation: any) => {
    console.log('cLocation', cLocation)
    let localArray = previousLocations;
    console.log('localArray in Move before', localArray)
    localArray.push(cLocation);
    console.log('localArray in Move after', localArray)
    setPreviousLocations(localArray);
    console.log('previousLocations in Move', previousLocations);

  }

  const removeLocation = (index) => {
    console.log("removeLocation pressed");
    console.log("index", index);
    let localArray = previousLocations;
    console.log("Before:", localArray);
    // localArray.filter(obj => obj.index != index)
    localArray.splice(index, 1);
    setPreviousLocations(localArray);
    console.log("After:", localArray);
    setRefreshFlatList(!refreshFlatlist);
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
  };

  return (
    //  Object.keys(currentLocation).length > 0 ?
    previousLocations.length > 0 ? (
      <HomeScreenView
        currentLocation={currentLocation}
        previousLocations={previousLocations}
        refreshFlatlist={refreshFlatlist}
        handleCardPress={handleCardPress}
        removeLocation={removeLocation}
        removeAllLocations={removeAllLocations}
      />
    ) : (
      null
    )
  );
};

export default HomeScreen;
