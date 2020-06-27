import React from 'react';
// hooks
import { useSelector } from 'react-redux';
import { useThunkDispatch } from '../../store/AppThunkDispatch';
import { addToCart } from '../../store/actions';
import { useRoute } from '@react-navigation/native';

// types
import { AppState } from '../../store/reducers';
import { Product } from '../../models/product';

// components
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  buttonWrapper: {
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: colors.primary,
    color: 'white',
    padding: 5,
  },
});

const ProductDetailScreen = () => {
  const { params } = useRoute() as { params: { productId: string | null } };
  const id = params ? params.productId : null;
  const product = useSelector((state: AppState) =>
    state.products.availableProducts.find(prod => prod.id === id)
  ) as Product;
  const dispatch = useThunkDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: product.imageUrl }} />
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={() => {
            dispatch(addToCart(product));
          }}
        >
          <Text style={styles.button}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

export const screenOptions = ({ route }: any) => ({
  headerTitle: route.params.producctTitle,
});

export default ProductDetailScreen;
