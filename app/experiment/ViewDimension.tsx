import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ViewDimension = () => {
  return (
    <View style={styles.container}>
      <Text>ViewDimension</Text>
      <View
        style={styles.view1}
        onLayout={(event) => {
          var { x, y, width, height } = event.nativeEvent.layout;
          console.log(x, y, width, height)
        }}
      />
    </View>
  );
};

export default ViewDimension;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',


    },
    view1: {
        height: 100,
        width: 100,
        backgroundColor: 'red'
    }
});
