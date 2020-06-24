import React, { useState } from 'react';
// components
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import CartItem from './CartItem';
import Card from '../UI/Card';

// types
import { Order } from '../../models/order';

import colors from '../../constants/colors';

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  amount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  date: {
    fontFamily: 'open-sans',
    fontSize: 16,
    color: '#888',
  },
  detailItems: {
    width: '100%',
  },
});

interface Props {
  order: Order;
}

const OrderItem = ({ order }: Props) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.amount}>${order.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{order.date}</Text>
      </View>
      <TouchableOpacity onPress={() => setShowDetails(prev => !prev)}>
        <Text
          style={{
            color: 'white',
            backgroundColor: colors.primary,
            padding: 5,
          }}
        >
          {showDetails ? 'Hide' : 'Show'} Details
        </Text>
      </TouchableOpacity>
      {showDetails && (
        <View style={styles.detailItems}>
          {order.items.map(({ item, id }) => (
            <CartItem key={id} item={item} deletable={false} />
          ))}
        </View>
      )}
    </Card>
  );
};

export default OrderItem;
