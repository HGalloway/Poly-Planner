import * as React from 'react';
import {StatusBar} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

import Home from '@screens/Home'
import Profile from '@screens/Profile'
import Settings from '@screens/Settings'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false, tabBarIcon: ({ size, color }) => (<Icon name={"home"} size={size} />)}} /> 
        <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false, tabBarIcon: ({size, color}) => (<Icon name={"person-circle"} size={size} />)}} /> 
        <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false, tabBarIcon: ({ size, color }) => (<Icon name={"cog"} size={size} />) }} /> 
      </Tab.Navigator>
    </NavigationContainer>
  );
}