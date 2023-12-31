/**
 * @format
 */

import {  AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  remoteMessage
});

// Initialize React Native Push Notification
PushNotification.configure({
  onNotification: function (notification) {
    // Handle the notification as needed
    notification
  },
});


AppRegistry.registerComponent(appName, () => App);
