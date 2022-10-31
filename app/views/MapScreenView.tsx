import * as React from 'react';
import MapView, { Marker } from 'react-native-maps'
import { StyleSheet, Text, View, Dimensions } from 'react-native';

type MapScreenViewProps ={
  latitude: number
  longitude: number
}

const MapScreenView = (props: MapScreenViewProps) => {
  const { latitude, longitude } = props;
  // console.log('On View latitude', latitude, 'longitude', longitude)

  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
      initialRegion={{
        latitude: props.latitude,
        longitude: props.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
        <Marker coordinate={{
          latitude: props.latitude,
          longitude: props.longitude,
        }}/>
        
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreenView