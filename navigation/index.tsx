import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useSelector } from 'react-redux';
import { AppState } from '../store/reducers';
import { ShopNavigator } from './MainNavigator';
import { AuthNavigator } from './ShopNavigator';
import StartupScreen from '../screens/StartupScreen';

const Navigation = () => {
  const isAuth = useSelector((state: AppState) => !!state.auth.token);
  const didTryAutoLogin = useSelector(
    (state: AppState) => state.auth.authAutoTried
  );

  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default Navigation;
