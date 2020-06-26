import React, { useState, useEffect } from 'react';
// hooks
import { useSelector } from 'react-redux';
import { DrawerActions } from 'react-navigation-drawer';
import { AppState } from '../../store/reducers';
import { NavigationProps } from '../../navigation/navigationPropType';

// components
import { FlatList, Platform, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import { useThunkDispatch } from '../../store/AppThunkDispatch';
import { getOrders } from '../../store/actions';
import Loading from '../../components/UI/Loading';
import CenteredView from '../../components/UI/CenteredView';

const OrderScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const orders = useSelector((state: AppState) => state.order.orders);
  const dispatch = useThunkDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(getOrders()).then(() => setIsLoading(false));
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return (
      <CenteredView>
        <Text>No orders found, maybe start ordering some products?</Text>
      </CenteredView>
    );
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderItem order={item} />}
    />
  );
};

OrderScreen.navigationOptions = ({
  navigation,
}: {
  navigation: NavigationProps;
}) => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        />
      </HeaderButtons>
    ),
  };
};

export default OrderScreen;
