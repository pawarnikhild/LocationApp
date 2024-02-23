import React, { useState, useEffect, useContext } from "react";
import { useRoute } from "@react-navigation/native";

import AppContext from "../context/AppContext";

import MapScreenView from "../views/MapScreenView";
import { resultData } from "../experiment/data";

const MapScreen = () => {
  const { previousLocations } = useContext(AppContext);
  const route = useRoute();
  const { latitude = null, longitude = null } = route.params || {};
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [initialRegionInLocations, setInitialRegionInLocations] = useState(null);

  useEffect(() => {
    initializeInitialRegion();
    return () => {
      console.log('Clearing selectedRegion++++++')
      setSelectedRegion(null);
    }
  }, []);

  const initializeInitialRegion = () => {
    console.log('running initializeInitialRegion --------------------')
    if (latitude !== null || longitude !== null) {
      const iRegion = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setSelectedRegion(iRegion);
    } else {
      const iRegion = {
        latitude: resultData[0].results[0].geometry.lat,
        longitude: resultData[0].results[0].geometry.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
      setInitialRegionInLocations(iRegion);
    }
  };

  // console.log('latitude in MapScreen', latitude, 'longitude in MapScreen', longitude)
  // console.log('previousLocations in MapScreen', previousLocations.length)
  // console.log('selectedRegion in MapScreen', selectedRegion)
  // console.log('initialRegionInLocations in MapScreen', initialRegionInLocations)

  return (
    <MapScreenView
      latitude={latitude}
      longitude={longitude}
      selectedRegion={selectedRegion}
      initialRegionInLocations={initialRegionInLocations}
      // previousLocations={previousLocations}
      previousLocations={resultData}
    />
  );
};

export default MapScreen;
