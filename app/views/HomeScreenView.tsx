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

  const getItemLayout = (data, index: number) => ({
    length: 93.71428680419922,
    offset: index * 93.71428680419922 * index,
    index,
  });

  const renderItem = ({ item, index }) => {
    if (index < previousLocations.length - 1) {
      return (
        <PreviousLocationCard
          key={index}
          name={
            // item.results[0].formatted
            index
          }
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
    } else {
      return null;
    }
  };
  // console.log("previousLocations in View", previousLocations);
  // console.log("previousLocations length in View", previousLocations.length);
  return (
    <SafeAreaView style={GlobleStyles.appContainer}>
      <StatusBar />
      <Text style={HomeScreenStyle.heading}>Location Manager</Text>
      <Text style={HomeScreenStyle.subHeading}>Current Location</Text>
      {/* <Icon name='map' size={50}/> */}
      {/* <CurrentLocationCard
        name={currentLocation.results[0].formatted}
        time={currentLocation.timestamp.created_http}
        onCardPress={() => {
          handleCardPress(
            currentLocation.results[0].geometry.lat,
            currentLocation.results[0].geometry.lng
          );
        }}
        // onRemove={}
        // style={HomeScreenStyle}
      /> */}
      {previousLocations.length > 0 ? (
        <CurrentLocationCard
          name={
            previousLocations[0].results[0].formatted
            // previousLocations[0].cont
          }
          time={previousLocations[0].timestamp.created_http}
          onCardPress={() => {
            handleCardPress(
              previousLocations[0].results[0].geometry.lat,
              previousLocations[0].results[0].geometry.lng
            );
          }}
          // onRemove={}
          // style={HomeScreenStyle}
        />
      ) : null}
      <Text style={HomeScreenStyle.subHeading}>Previous Locations</Text>
      {/* {previousLocations.length > 2 ? ( */}
      <View style={{height: "70%"}}>
      <FlatList
        data={previousLocations}
        // keyExtractor={(item) => item.id}
        // initialScrollIndex={1}
        // getItemLayout={(data, index) => (
        //   {length: 93.71428680419922, offset: index * 93.71428680419922 * index, index}
        // )}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        extraData={refreshFlatlist}
      />
      </View>
      {/* // ) : null} */}
      <Button
        title="Remove All Locations"
        color={AppColor.red}
        onPress={removeAllLocations}
      />
    </SafeAreaView>
  );
};

export default HomeScreenView;
