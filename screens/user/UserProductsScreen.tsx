import React from 'react';
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
import { NavigationProps } from '../../navigation/navigationPropType';

// actions
import { DrawerActions } from 'react-navigation-drawer';
import { deleteProduct } from '../../store/actions';
import CenteredView from '../../components/UI/CenteredView';

interface Props {
  navigation: NavigationProps;
}

const UserProductScreen = ({ navigation }: Props) => {
  const products = useSelector(
    (state: AppState) => state.products.userProducts
  );
  const dispatch = useThunkDispatch();

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

UserProductScreen.navigationOptions = ({
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
          title="Add"
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => navigation.navigate('EditProduct')}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductScreen;
