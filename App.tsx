/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import Main from './src/App';
import { store } from './src/store';
import Theme from './src/theme';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <NativeBaseProvider theme={Theme}>
      <NavigationContainer>
        <Provider store={store}>
          <Main />
        </Provider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
