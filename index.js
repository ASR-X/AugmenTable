/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { App } from './app/App';
import { name as appName } from './app.json';
import { ARInfo } from './app/ARInfo';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(ARInfo.moduleName, () => ARInfo);