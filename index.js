/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from '~/App';
import {name as appName} from './app.json';
import { MyCamera } from '~/Screens/MyFeed/MyCamera.tsx';

AppRegistry.registerComponent(appName, () => App);
