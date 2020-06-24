import { Product } from '../../models/product';

export enum CartActions {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  CLEAR_CART = 'CLEAR_CART',
  REMOVE_FROM_CART_DELETED = 'REMOVE_FROM_CART_DELETED',
}

interface AddToCart {
  type: typeof CartActions.ADD_TO_CART;
  payload: { product: Product };
}

interface RemoveFromCart {
  type: typeof CartActions.REMOVE_FROM_CART;
  payload: { id: string };
}

interface RemoveFromCartDeleted {
  type: typeof CartActions.REMOVE_FROM_CART_DELETED;
  payload: { id: string };
}

interface ClearCart {
  type: typeof CartActions.CLEAR_CART;
  payload: {};
}

export type CartActionTypes =
  | AddToCart
  | RemoveFromCart
  | ClearCart
  | RemoveFromCartDeleted;
