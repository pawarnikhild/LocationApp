import React from "react";
import { Text, View, Image } from "react-native";

import SplashScreenStyle from "../styles/SplashScreenStyle";

const SplashScreenView = () => {
  return (
    <View style={SplashScreenStyle.container}>
      <Image
        style={SplashScreenStyle.imageStyle}
        source={require("../assets/LocationImage.jpg")}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreenView;
