import React, { useEffect, useState, useCallback } from 'react';
// hooks
import { useSelector } from 'react-redux';
import { useThunkDispatch } from '../../store/AppThunkDispatch';

// types
import { AppState } from '../../store/reducers';

// actions
import { addToCart, getProducts } from '../../store/actions';
import { DrawerActions, useNavigation } from '@react-navigation/native';

// components
import { FlatList, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Loading from '../../components/UI/Loading';
import NotFound from '../../components/UI/NotFound';
import ErrorComponent from '../../components/UI/Error';

const ProductOverviewScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const products = useSelector(
    (state: AppState) => state.products.availableProducts
  );
  const dispatch = useThunkDispatch();
  const navigation = useNavigation();

  const loadProducts = useCallback(async () => {
    setError('');
    setIsRefreshing(true);
    try {
      await dispatch(getProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => loadProducts);

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => setIsLoading(false));
  }, [loadProducts]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            onPress={() => navigation.navigate('Cart')}
          />
        </HeaderButtons>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <ErrorComponent error={error} title="Try again" onPress={loadProducts} />
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && products.length === 0) {
    return <NotFound text="No products found. Maybe start adding some!" />;
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      renderItem={({ item }) => (
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onAddToCart={() => {
            dispatch(addToCart(item));
          }}
          onSelect={() => {
            navigation.navigate('ProductDetail', {
              params: { productId: item.id, productTitle: item.title },
            });
          }}
        />
      )}
    />
  );
};

export const screenOptions = {
  headerTitle: 'All Products',
};

export default ProductOverviewScreen;
