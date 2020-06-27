import React, { useEffect } from 'react';
// components
import { FlatList, Platform, Alert, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';

// hooks
import { useSelector } from 'react-redux';
import { useThunkDispatch } from '../../store/AppThunkDispatch';

// types
import { AppState } from '../../store/reducers';

// actions
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { deleteProduct } from '../../store/actions';
import CenteredView from '../../components/UI/CenteredView';

const UserProductScreen = () => {
  const products = useSelector(
    (state: AppState) => state.products.userProducts
  );
  const dispatch = useThunkDispatch();
  const navigation = useNavigation();

  const deleteHandler = (id: string) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(deleteProduct(id));
        },
      },
    ]);
  };

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
            title="Add"
            iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            onPress={() => navigation.navigate('EditProduct')}
          />
        </HeaderButtons>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (products.length === 0) {
    return (
      <CenteredView>
        <Text>No products found, maybe start creating some?</Text>
      </CenteredView>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item: { price, imageUrl, title, id } }) => (
        <ProductItem
          image={imageUrl}
          price={price}
          title={title}
          // acion to delete
          onAddToCart={() => deleteHandler(id)}
          //   action to edit
          onSelect={() => {
            navigation.navigate('EditProduct', { productId: id });
          }}
          admin
        />
      )}
    />
  );
};

export const screenOptions = {
  headerTitle: 'All Products',
};

export default UserProductScreen;
