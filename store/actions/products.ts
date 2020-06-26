import {
  ProductActions,
  CreateProductType,
  UpdateProductType,
} from '../types/products';
import { AppThunkDispatch } from '../AppThunkDispatch';
import { removeFromCartDeleted } from './cart';
import { Product } from '../../models/product';
import { AppState } from '../reducers';

export const deleteProduct = (id: string) => async (
  dispatch: AppThunkDispatch,
  getState: () => AppState
) => {
  const {
    auth: { token },
  } = getState();
  const response = await fetch(
    `https://rn-shopping-app-2bed2.firebaseio.com/products/${id}.json?auth=${token}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  dispatch(removeFromCartDeleted(id));

  return dispatch({
    type: ProductActions.DELETE_PRODUCT,
    payload: { id },
  });
};

export const getProducts = () => async (
  dispatch: AppThunkDispatch,
  getState: () => AppState
) => {
  try {
    const response = await fetch(
      'https://rn-shopping-app-2bed2.firebaseio.com/products.json'
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = (await response.json()) as {
      [key: string]: CreateProductType & { ownerId: string };
    };

    type Resp = [string, CreateProductType & { ownerId: string }];

    let products: Product[] = [];

    if (Object.keys(resData).length) {
      products = Object.entries(resData).map(
        ([id, { title, imageUrl, description, price, ownerId }]: Resp) =>
          new Product(id, ownerId, title, imageUrl, description, price)
      );
    }

    const {
      auth: { userId },
    } = getState();

    return dispatch({
      type: ProductActions.GET_PRODUCTS,
      payload: {
        products,
        userProducts: products.filter(prod => prod.ownerId === userId),
      },
    });
  } catch (error) {
    console.log('getProducts -> error', error);
    throw error;
  }
};

export const createProduct = (data: CreateProductType) => async (
  dispatch: AppThunkDispatch,
  getState: () => AppState
) => {
  const {
    auth: { token, userId },
  } = getState();
  const response = await fetch(
    `https://rn-shopping-app-2bed2.firebaseio.com/products.json?auth=${token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, ownerId: userId }),
    }
  );

  const resData = await response.json();

  return dispatch({
    type: ProductActions.CREATE_PRODUCT,
    payload: { ...data, id: resData.name!, ownerId: userId },
  });
};

export const updateProduct = (data: UpdateProductType) => async (
  dispatch: AppThunkDispatch,
  getState: () => AppState
) => {
  const {
    auth: { token },
  } = getState();
  const { description, imageUrl, title, id } = data;
  const response = await fetch(
    `https://rn-shopping-app-2bed2.firebaseio.com/products/${id}.json?auth=${token}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description, imageUrl, title }),
    }
  );

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  return dispatch({
    type: ProductActions.UPDATE_PRODUCT,
    payload: data,
  });
};
