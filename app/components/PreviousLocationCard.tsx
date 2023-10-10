import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AppColor, FontSize } from "../utils/StyleConstant";

type PreviousLocationCardProps = {
  name: string;
  time: string;
  style?: object;
  onCardPress: (active: any) => void;
  onRemove: (active: any) => void;
  // onRemove: (active: number) => void // not working
};

const PreviousLocationCard = (props: PreviousLocationCardProps) => {
  return (
    <TouchableOpacity
      style={{ ...styles.previouslocationCard, ...props.style }}
      onPress={props.onCardPress}
      onLayout={(event) => {
        var { x, y, width, height } = event.nativeEvent.layout;
        // console.log("Dimesions of PreviousLocationCard", x, y, width, height);
      }}
    >
      <View style={styles.textView}>
        <Text numberOfLines={2} style={styles.locationName}>
          {props.name}
        </Text>
        <Text style={styles.locationTime}>{props.time}</Text>
      </View>
      <View style={styles.button}>
        <Button title="Remove" color={AppColor.red} onPress={props.onRemove} />
      </View>
    </TouchableOpacity>
  );
};

export default PreviousLocationCard;

const styles = StyleSheet.create({
  previouslocationCard: {
    flexDirection: "row",
    marginBottom: 8,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: AppColor.offWhite,
    borderRadius: 4,
  },
  textView: {
    width: "80%",
    // backgroundColor: 'red'
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
  button: {
    // width: '30%'
  },
});
