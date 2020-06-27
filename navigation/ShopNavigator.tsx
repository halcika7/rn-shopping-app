import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import ProductOverviewScreen, {
  screenOptions,
} from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen, {
  screenOptions as detailScreenOptions,
} from '../screens/shop/ProductDetailScreen';
import CartScreen, {
  screenOptions as cartScreenOptions,
} from '../screens/shop/CartScreen';
import OrderScreen, {
  screenOptions as orderScreenOptions,
} from '../screens/shop/OrdersScreen';
import UserProductScreen, {
  screenOptions as userProductScreenOptions,
} from '../screens/user/UserProductsScreen';
import EditProductScreen, {
  screenOptions as editProductScreenOptions,
} from '../screens/user/EditProductScreen';

// components
import colors from '../constants/colors';
import AuthScreen, {
  screenOptions as authScreenOptions,
} from '../screens/user/AuthScreen';

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary,
};

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductOverviewScreen}
        options={screenOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={detailScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <OrdersStackNavigator.Screen
        name="Orders"
        component={OrderScreen}
        options={orderScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <AdminStackNavigator.Screen
        name="UserProducts"
        component={UserProductScreen}
        options={userProductScreenOptions}
      />
      <AdminStackNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};
