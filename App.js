import * as React from 'react';
import { Text, View, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Profile from './assets/Screens/Profile'

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false, tabBarIcon: ({ size, color }) => (<Icon name={"home"} size={size} />)}} /> 
        <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false, tabBarIcon: ({size, color}) => (<Icon name={"person-circle"} size={size} />)}} /> 
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false, tabBarIcon: ({ size, color }) => (<Icon name={"cog"} size={size} />) }} /> 
      </Tab.Navigator>
    </NavigationContainer>
  );
}