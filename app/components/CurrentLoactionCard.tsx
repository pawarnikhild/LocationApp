import React from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { AppColor, FontSize } from "../utils/StyleConstant";

type CurrentLocationCardProps = {
  name: string;
  time: string;
  style?: object;
  onCardPress: (active: any) => void;
};

const CurrentLocationCard = (props: CurrentLocationCardProps) => {
  return (
    <TouchableOpacity
      style={{ ...styles.currentlocationCard, ...props.style }}
      onPress={props.onCardPress}
    >
      <View style={styles.iconBackground}>
        <MaterialIcon name="my-location" size={30} color={AppColor.lightBlue} />
      </View>
      <View style={styles.textView}>
        <Text numberOfLines={2} style={styles.locationName}>
          {props.name}
        </Text>
        <Text style={styles.locationTime}>{props.time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CurrentLocationCard;

const styles = StyleSheet.create({
  currentlocationCard: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 4,
    // backgroundColor: AppColor.grey,
  },
  iconBackground: {
    marginRight: 10,
    backgroundColor: AppColor.lightOrange,
    borderRadius: 34,
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  textView: {
    width: '70%'
  },
  locationName: {
    fontSize: FontSize.medium,
    color: AppColor.black,
  },
  locationTime: {
    fontSize: FontSize.small,
    // color: AppColor.grey
    color: AppColor.black,
  },
});
