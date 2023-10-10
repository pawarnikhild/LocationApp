import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const UseExp = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("This will run after 1 second!");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <View>
      <Text>UseExp</Text>
    </View>
  );
};

export default UseExp;

const styles = StyleSheet.create({});
