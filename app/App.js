import React, { Component } from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from "./store"

import ScanPageContainer from './ScanPage';

const Stack = createStackNavigator();


export class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="scan" screenOptions={{headerShown: false}}>
            <Stack.Screen name="scan" component={ScanPageContainer}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
