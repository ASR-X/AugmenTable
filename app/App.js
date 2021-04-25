import React, { Component } from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import conditionsReducer from './reducers/ConditionsReducer';

import { ScanPage } from './ScanPage';

const Stack = createStackNavigator();
const store = createStore(conditionsReducer);

export class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="scan" screenOptions={{headerShown: false}}>
            <Stack.Screen name="scan" component={ScanPage}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
