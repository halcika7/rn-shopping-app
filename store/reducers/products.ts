/* eslint-disable security/detect-object-injection */
import { ProductActionTypes, ProductActions } from '../types/products';
import { Product } from '../../models/product';

export interface ProductsState {
  availableProducts: Product[];
  userProducts: Product[];
}

const INITIAL_STATE: ProductsState = {
  availableProducts: [],
  userProducts: [],
};

const findIndex = (
  state: ProductsState,
  id: string,
  property: 'availableProducts' | 'userProducts' = 'userProducts'
) => state[property].findIndex(prod => prod.id === id);

const updateProducts = (
  state: ProductsState,
  product: Product,
  index: number,
  property: 'availableProducts' | 'userProducts' = 'userProducts'
) => {
  const products = [...state[property]];
  products[index] = product;
  return products;
};

export function ProductsReducer(
  state = INITIAL_STATE,
  action: ProductActionTypes
) {
  switch (action.type) {
    case ProductActions.GET_PRODUCTS: {
      return {
        ...state,
        availableProducts: action.payload.products,
        userProducts: action.payload.products.filter(
          prod => prod.ownerId === 'u1'
        ),
      };
    }
    case ProductActions.CREATE_PRODUCT: {
      const { description, imageUrl, price, title, id } = action.payload;
      const newProduct = new Product(
        id,
        'u1',
        title,
        imageUrl,
        description,
        price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    }
    case ProductActions.UPDATE_PRODUCT: {
      const { description, id, imageUrl, title } = action.payload;
      const index = findIndex(state, id);
      const availableIndex = findIndex(state, id, 'availableProducts');
      const { ownerId, price } = state.userProducts[index];
      const updatedProduct = new Product(
        id,
        ownerId,
        title,
        imageUrl,
        description,
        price
      );
      const userProducts = updateProducts(state, updatedProduct, index);

      const availableProducts = updateProducts(
        state,
        updatedProduct,
        availableIndex,
        'availableProducts'
      );

      return { ...state, userProducts, availableProducts };
    }
    case ProductActions.DELETE_PRODUCT: {
      return {
        ...state,
        userProducts: state.userProducts.filter(
          prod => prod.id !== action.payload.id
        ),
        availableProducts: state.availableProducts.filter(
          prod => prod.id !== action.payload.id
        ),
      };
    }
    default:
      return state;
  }
}
