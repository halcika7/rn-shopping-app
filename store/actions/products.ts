import {
  ProductActions,
  CreateProductType,
  UpdateProductType,
} from '../types/products';
import { AppThunkDispatch } from '../AppThunkDispatch';
import { removeFromCartDeleted } from './cart';
import { Product } from '../../models/product';

export const deleteProduct = (id: string) => async (
  dispatch: AppThunkDispatch
) => {
  const response = await fetch(
    `https://rn-shopping-app-2bed2.firebaseio.com/products/${id}.json`,
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

export const getProducts = () => async (dispatch: AppThunkDispatch) => {
  try {
    const response = await fetch(
      'https://rn-shopping-app-2bed2.firebaseio.com/products.json'
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = (await response.json()) as {
      [key: string]: CreateProductType;
    };

    type Resp = [string, CreateProductType];

    let products: Product[] = [];

    if (Object.keys(resData).length) {
      products = Object.entries(resData).map(
        ([id, { title, imageUrl, description, price }]: Resp) =>
          new Product(id, 'u1', title, imageUrl, description, price)
      );
    }

    return dispatch({
      type: ProductActions.GET_PRODUCTS,
      payload: { products },
    });
  } catch (error) {
    console.log('getProducts -> error', error);
    throw error;
  }
};

export const createProduct = (data: CreateProductType) => async (
  dispatch: AppThunkDispatch
) => {
  const response = await fetch(
    'https://rn-shopping-app-2bed2.firebaseio.com/products.json',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  const resData = await response.json();

  return dispatch({
    type: ProductActions.CREATE_PRODUCT,
    payload: { ...data, id: resData.name! },
  });
};

export const updateProduct = (data: UpdateProductType) => async (
  dispatch: AppThunkDispatch
) => {
  const { description, imageUrl, title, id } = data;
  const response = await fetch(
    `https://rn-shopping-app-2bed2.firebaseio.com/products/${id}.json`,
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
