import React from 'react'
import { View, Text } from 'react-native'
import { useRoute } from '@react-navigation/native'

import MapScreenView from '../views/MapScreenView'

const MapScreen = () => {
  const route = useRoute();
  const { latitude, longitude } = route.params;

  return (
    <MapScreenView
      latitude={latitude}
      longitude={longitude}
    />
  )
}

export default MapScreen