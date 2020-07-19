import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home'
import JoinScreen from './JoinScreen'
import FriendListScreen from './FriendListScreen'



const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Join" component={JoinScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Friend" component={FriendListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;