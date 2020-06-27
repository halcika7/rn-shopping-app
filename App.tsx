/* eslint-disable global-require */
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import Navigation from './navigation';

const fetchFonts = async () =>
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

export default function App() {
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
