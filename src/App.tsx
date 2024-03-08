import React from 'react';
import { LogLevel, OneSignal } from 'react-native-onesignal';
import AppNavigator from './navigation';

export default function App() {
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  OneSignal.initialize('392cd87d-017d-4303-81e7-1882b7117477');

  // Method for listening for notification clicks
  OneSignal.Notifications.addEventListener('click', event => {
    console.log('OneSignal: notification clicked:', event);
  });

  return <AppNavigator />;
}
