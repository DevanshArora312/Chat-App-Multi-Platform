import { View, Text } from 'react-native'
import React from 'react'
import Home from './screens/Home'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SingleChat from './screens/SingleChat';
import Login from './screens/Login';
import Signup from './screens/Signup';
const Stack = createNativeStackNavigator();
import {store} from "./redux/store.js";
import {Provider as ReduxProvider} from 'react-redux';
import Startup from './screens/Startup.tsx';

export default function Index() : JSX.Element {
  return (
    <ReduxProvider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Startup"
        component={Startup}
      />
      <Stack.Screen
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="SingleChat"
        component={SingleChat}
      />
      <Stack.Screen
        name="Login"
        component={Login}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
      />
      </Stack.Navigator>
  </NavigationContainer>
  </ReduxProvider>

  )
}