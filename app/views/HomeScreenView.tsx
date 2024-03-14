import React from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  FlatList,
  Button,
  Image,
} from "react-native";

import Icon from "react-native-vector-icons/Foundation";
import CurrentLocationCard from "../components/CurrentLoactionCard";
import PreviousLocationCard from "../components/PreviousLocationCard";
import { AppColor } from "../utils/StyleConstant";

import GlobleStyles from "../utils/GlobleStyles";
import HomeScreenStyle from "../styles/HomeScreenStyle";

type HomeScreenViewProps = {
  showListView: boolean;
  locations: any[];
  refreshFlatlist: boolean;
  islocationOn: boolean;
  turnOnLocation: () => void;
  handleCardPress: (lat: number, lng: number, index?: number) => void;
  removeLocation: (active: number) => void;
  removeAllLocations: () => void;
  handleSeeAllLocation: () => void;
};

const HomeScreenView = (props: HomeScreenViewProps) => {
  const {
    showListView,
    locations,
    refreshFlatlist,
    islocationOn,
    turnOnLocation,
    handleCardPress,
    removeLocation,
    removeAllLocations,
    handleSeeAllLocation,
  } = props;

  const renderItem = ({ item, index }) => {
    if (index < locations.length - 1) {
      return (
        <PreviousLocationCard
          key={index}
          name={
            item.results[0].formatted
            // index
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
        />
      );
    } else {
      return null;
    }
  };

  return !showListView ? (
    <SafeAreaView
      style={{
        ...GlobleStyles.appContainer,
        justifyContent: "center",
      }}
    >
      <Image
        style={HomeScreenStyle.enableLocationImage}
        source={require("../assets/enableLocation.jpg")}
      />
      <Text style={HomeScreenStyle.locationNotOnText}>
        You need to turn on the location so we can track it
      </Text>
      <Button
        title="Turn on Location"
        onPress={turnOnLocation}
        color={AppColor.black}
      />
    </SafeAreaView>
  ) : (
    <SafeAreaView style={GlobleStyles.appContainer}>
      <StatusBar />
      <Text style={HomeScreenStyle.heading}>Location Manager</Text>
      <Text style={HomeScreenStyle.subHeading}>Current Location</Text>
      {/* <Icon name='map' size={50}/> */}
      {locations.length > 0 && (
        <CurrentLocationCard
          name={
            locations[0].results[0].formatted
            // locations[0].cont
          }
          time={locations[0].timestamp.created_http}
          onCardPress={() => {
            handleCardPress(
              locations[0].results[0].geometry.lat,
              locations[0].results[0].geometry.lng
            );
          }}
        />
      )}
      <Text style={HomeScreenStyle.subHeading}>Previous Locations</Text>
      <View style={{ height: islocationOn ? "68%" : "61%" }}>
        <FlatList
          data={locations}
          renderItem={renderItem}
          extraData={refreshFlatlist}
        />
      </View>
      <View
        style={{
          ...HomeScreenStyle.bottomView,
          height: islocationOn ? 80 : 140,
        }}
      >
        {!islocationOn && (
          <Button
            title="Location turned off! You need to turn on the location so we can track it. Click to turn on"
            color={"#cc0000"}
            onPress={turnOnLocation}
          />
        )}
        <Button
          title="Remove All Locations"
          color={AppColor.red}
          onPress={removeAllLocations}
        />
        <Button
          title="See All Locations"
          color={AppColor.black}
          onPress={handleSeeAllLocation}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreenView;
