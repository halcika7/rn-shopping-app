import React, { useEffect, useState, useCallback } from 'react';
// hooks
import { useSelector } from 'react-redux';
import { useThunkDispatch } from '../../store/AppThunkDispatch';

// types
import { AppState } from '../../store/reducers';
import { NavigationProps } from '../../navigation/navigationPropType';

// actions
import { addToCart, getProducts } from '../../store/actions';
import { DrawerActions } from 'react-navigation-drawer';

// components
import { FlatList, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Loading from '../../components/UI/Loading';
import NotFound from '../../components/UI/NotFound';
import ErrorComponent from '../../components/UI/Error';

interface Props {
  navigation: NavigationProps;
}

const ProductOverviewScreen = ({ navigation }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const products = useSelector(
    (state: AppState) => state.products.availableProducts
  );
  const dispatch = useThunkDispatch();

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
    const sub = navigation.addListener('willFocus', () => loadProducts);

    return () => {
      sub.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => setIsLoading(false));
  }, [loadProducts]);

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
            navigation.navigate({
              routeName: 'ProductDetail',
              params: { productId: item.id, productTitle: item.title },
            });
          }}
        />
      )}
    />
  );
};

ProductOverviewScreen.navigationOptions = ({
  navigation,
}: {
  navigation: NavigationProps;
}) => {
  return {
    headerTitle: 'All Products',
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
  };
};

export default ProductOverviewScreen;
