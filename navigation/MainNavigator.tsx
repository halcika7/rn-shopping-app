import React from 'react';
import { Platform } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  ProductsNavigator,
  OrdersNavigator,
  AdminNavigator,
} from './ShopNavigator';
import colors from '../constants/colors';
import LogoutButton from '../components/UI/LogoutButton';
import { Ionicons } from '@expo/vector-icons';

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={props => <LogoutButton {...props} />}
      drawerContentOptions={{
        activeTintColor: colors.primary,
        labelStyle: {
          fontFamily: 'open-sans-bold',
        },
      }}
    >
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={23}
              color={color}
            />
          ),
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};
