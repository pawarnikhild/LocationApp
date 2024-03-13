import React from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { data } from "../experiment/data";
import { resultData, actualResultData } from "../experiment/data";
import GlobleStyles from "../utils/GlobleStyles";

type region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

type MapScreenViewProps = {
  latitude: number;
  longitude: number;
  selectedRegion: region;
  initialRegionInLocations: region;
  locations: any[];
};

const MapScreenView = (props: MapScreenViewProps) => {
  const {
    latitude,
    longitude,
    selectedRegion,
    initialRegionInLocations,
    locations,
  } = props;

  return (
    <View style={GlobleStyles.appContainer}>
      {selectedRegion !== null ? (
        <>
          <MapView
            style={StyleSheet.absoluteFill}
            loadingEnabled
            showsUserLocation
            showsMyLocationButton
            initialRegion={selectedRegion}
          >
            <Marker
              coordinate={{
                latitude: selectedRegion.latitude,
                longitude: selectedRegion.longitude,
              }}
            />
          </MapView>
          <Text>One Location MapView</Text>
        </>
      ) : (
        <>
          <MapView
            style={StyleSheet.absoluteFill}
            loadingEnabled
            showsUserLocation
            showsMyLocationButton
            initialRegion={initialRegionInLocations}
          >
            {/* {locations.map((item, index) => (
              <Marker
                coordinate={{
                  latitude: item.results[0].geometry.lat,
                  longitude: item.results[0].geometry.lng,
                  // item.results[0].geometry.lat
                }}
              />
            ))} */}
            {actualResultData.map((item, index) => (
              <Marker
                key={index}
                // title={item.results[0].formatted}
                coordinate={{
                  latitude: item.results[0].geometry.lat,
                  longitude: item.results[0].geometry.lng,
                  // item.results[0].geometry.lat
                }}
              >
                <Callout>
                  <Text style={{ padding: 10 }}>
                    {item.results[0].formatted}
                  </Text>
                </Callout>
              </Marker>
            ))}
            {/* {data.map((item, index) => (
              <Marker
                coordinate={{
                  latitude: item.latlang.latitude,
                  longitude: item.latlang.longitude,
                  // item.results[0].geometry.lat
                }}
              />
            ))} */}
          </MapView>
          <Text>All Location MapView</Text>
        </>
      )}
    </View>
  );
};

export default MapScreenView;
