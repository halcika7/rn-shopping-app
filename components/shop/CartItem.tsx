import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { CartItem as Item } from '../../models/cart-item';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'open-sans',
    color: 'black',
    fontSize: 16,
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

interface Props {
  deletable?: boolean;
  item: Item;
  onRemove?: () => void;
}

const CartItem = ({ item, onRemove, deletable = true }: Props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{item.quantity} </Text>
        <Text style={{ ...styles.mainText, maxWidth: 150 }}>{item.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${item.sum.toFixed(2)}</Text>
        {deletable && (
          <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
            <Ionicons
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={23}
              color="red"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CartItem;
