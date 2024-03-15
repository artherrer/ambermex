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
import { NotifierWrapper } from 'react-native-notifier';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <NativeBaseProvider theme={Theme}>
          <Provider store={store}>
            <NotifierWrapper>
              <Main />
            </NotifierWrapper>
          </Provider>
        </NativeBaseProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
