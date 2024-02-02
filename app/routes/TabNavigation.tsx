import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FoundIcon from 'react-native-vector-icons/Foundation';

import HomeScreen from '../models/HomeScreen';
import MapScreen from '../models/MapScreen';

import { AppColor } from '../utils/StyleConstant';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
      <Tab.Navigator
        screenOptions={{
            tabBarShowLabel: false,
            headerTintColor: AppColor.lightBlue
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <FoundIcon
                name="home"
                size={30}
                color={focused ? AppColor.lightBlue : AppColor.grey}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <FoundIcon
                name="map"
                size={30}
                color={focused ? AppColor.lightBlue : AppColor.grey}
              />
            ),
          }}
        />
      </Tab.Navigator>
  );
};

export default TabNavigation;
