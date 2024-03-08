import React from 'react';
import { LogLevel, OneSignal } from 'react-native-onesignal';
import AppNavigator from './navigation';

export default function App() {
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  OneSignal.initialize('ONESIGNAL_APP_ID');

  // Method for listening for notification clicks
  OneSignal.Notifications.addEventListener('click', event => {
    console.log('OneSignal: notification clicked:', event);
  });

  return <AppNavigator />;
}
