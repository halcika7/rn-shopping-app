import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import {
  ProductsNavigator,
  OrdersNavigator,
  AdminNavigator,
  AuthNavigator,
} from './ShopNavigator';
import colors from '../constants/colors';
import StartupScreen from '../screens/StartupScreen';
import LogoutButton from '../components/UI/LogoutButton';

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: colors.primary,
      labelStyle: {
        fontFamily: 'open-sans-bold',
      },
    },
    contentComponent: props => <LogoutButton {...props} />,
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
