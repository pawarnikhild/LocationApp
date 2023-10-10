
import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";

const HomeScreen = () => {
  let count1 = 0
  const [locations, setLocations] = useState([]);
  const [count, setCount] = useState(0);
  let intervalRunning = false;
  useEffect(() => {
    pushLocation();
    // pushState();
  }, []);

  console.log("intervalRunning", intervalRunning)



  const pushLocation = () => {
    if (locations.length === 5) {
      console.log("Length exceeded");
    } else if (!intervalRunning) {
      intervalRunning = true;
      console.log("Interval is running")
      let myInterval = setInterval(() => {
        let localLocations = locations;
        localLocations.push(count1++);
        setLocations(localLocations);
        console.log("Location length", locations);
        if (locations.length >= 5) {
          clearInterval(myInterval);
          intervalRunning = false;
          console.log("Cleared interval", myInterval);
        }
      }, 1000);
    } else {
      console.log("Another Interval running");
    }
  };

  const decreaseArray = () => {
    let localLocations = locations;
    localLocations.pop();
    setLocations(localLocations);
    console.log("Location length", locations.length);
    console.log("Count", count);
    pushLocation();
  };

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Push Location" onPress={pushLocation} />
      {/* <Button title="Increase Array" onPress={increaseArray}/> */}
      <Button title="Decrease Array" onPress={decreaseArray} />
    </View>
  );
};

export default HomeScreen;