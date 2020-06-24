import React, { useState } from 'react';

// components
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';

// hooks
import { useSelector } from 'react-redux';
import { useThunkDispatch } from '../../store/AppThunkDispatch';
import { AppState } from '../../store/reducers';
import { removeFromCart, addOrder } from '../../store/actions';

import colors from '../../constants/colors';
import Loading from '../../components/UI/Loading';

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  amount: {
    color: colors.primary,
  },
  button: {
    color: Platform.OS === 'android' ? 'white' : colors.accent,
    backgroundColor: Platform.OS === 'android' ? colors.accent : 'white',
    padding: 5,
  },
  disabledButton: {
    color: '#ccc',
  },
});

const CartScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const totalAmount = useSelector((state: AppState) => state.cart.totalAmount);
  const cartItems = useSelector((state: AppState) =>
    Object.entries(state.cart.items)
      .map(([id, item]) => ({ item, id }))
      .sort((a, b) => (a.id > b.id ? 1 : -1))
  );
  const dispatch = useThunkDispatch();

  const addOrderHandler = async () => {
    setIsLoading(true);

    await dispatch(addOrder(cartItems, totalAmount));

    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.round(totalAmount * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <Loading size="small" />
        ) : (
          <TouchableOpacity
            disabled={cartItems.length === 0 || !cartItems}
            onPress={addOrderHandler}
          >
            <Text
              style={
                cartItems.length === 0
                  ? { ...styles.button, ...styles.disabledButton }
                  : { ...styles.button }
              }
            >
              Order Now
            </Text>
          </TouchableOpacity>
        )}
      </Card>
      <FlatList
        data={cartItems}
        renderItem={({ item: { id, item } }) => (
          <CartItem item={item} onRemove={() => dispatch(removeFromCart(id))} />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart',
};

export default CartScreen;
