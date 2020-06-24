import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';
import Card from '../UI/Card';

import colors from '../../constants/colors';

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  touchable: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    alignItems: 'center',
    height: '17%',
    padding: 10,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    marginVertical: 2,
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: colors.primary,
    color: 'white',
    padding: 5,
  },
});

interface Props {
  admin?: boolean;
  image: string;
  title: string;
  price: number;
  onSelect: () => void;
  onAddToCart: () => void;
}

const ProductItem = ({
  admin = false,
  image,
  title,
  price,
  onSelect,
  onAddToCart,
}: Props) => {
  let TouchableCmp = TouchableOpacity as any;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: image }} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
              <Text style={styles.price}>${price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={onSelect}>
                <Text style={styles.button}>
                  {!admin ? 'View Details' : 'Edit'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onAddToCart}>
                <Text style={styles.button}>
                  {!admin ? 'To Carts' : 'Delete'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

export default ProductItem;
