import React from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  FlatList,
  Button,
} from "react-native";

import Icon from "react-native-vector-icons/Foundation";
import CurrentLocationCard from "../components/CurrentLoactionCard";
import PreviousLocationCard from "../components/PreviousLocationCard";
import { AppColor } from "../utils/StyleConstant";

import GlobleStyles from "../utils/GlobleStyles";
import HomeScreenStyle from "../styles/HomeScreenStyle";

type HomeScreenViewProps = {
  currentLocation: {};
  previousLocations: any[];
  refreshFlatlist: boolean;
  handleCardPress: (lat: number, lng: number, index?: number) => void;
  removeLocation: (active: number) => void;
  removeAllLocations: () => void;
};

const HomeScreenView = (props: HomeScreenViewProps) => {
  const {
    currentLocation,
    previousLocations,
    refreshFlatlist,
    handleCardPress,
    removeLocation,
    removeAllLocations,
  } = props;

  const renderItem = ({ item, index }) => (
    <PreviousLocationCard
      key={index}
      name={item.results[0].formatted}
      time={item.timestamp.created_http}
      onCardPress={() => {
        handleCardPress(
          item.results[0].geometry.lat,
          item.results[0].geometry.lng,
          index
        );
      }}
      onRemove={() => {
        removeLocation(index);
      }}
      // style={HomeScreenStyle}
    />
  );
  console.log("previousLocations", previousLocations);
  return (
    <SafeAreaView style={GlobleStyles.appContainer}>
      <StatusBar />
      <Text style={HomeScreenStyle.heading}>Location Manager</Text>
      <Text style={HomeScreenStyle.subHeading}>Current Location</Text>
   
      <CurrentLocationCard
        name={previousLocations[0].results[0].formatted}
        time={previousLocations[0].timestamp.created_http}
        onCardPress={() => {
          handleCardPress(
            previousLocations[0].results[0].geometry.lat,
            previousLocations[0].results[0].geometry.lng
          );
        }}
      />
      <Text style={HomeScreenStyle.subHeading}>Previous Locations</Text>
      {previousLocations.length > 0 ? (
        <FlatList
          data={previousLocations}
          // keyExtractor={(item) => item.id}
          // initialScrollIndex={1}
          renderItem={renderItem}
          extraData={refreshFlatlist}
        />
      ) : null}
      <Button
        title="Remove All Locations"
        color={AppColor.red}
        onPress={removeAllLocations}
      />
    </SafeAreaView>
  );
};

export default HomeScreenView;
