import { CartActions, CartActionTypes } from '../types/cart';
import { Product } from '../../models/product';

export const addToCart = (product: Product): CartActionTypes => ({
  type: CartActions.ADD_TO_CART,
  payload: { product },
});

export const removeFromCart = (id: string): CartActionTypes => ({
  type: CartActions.REMOVE_FROM_CART,
  payload: { id },
});

export const clearCart = (): CartActionTypes => ({
  type: CartActions.CLEAR_CART,
  payload: {},
});

export const removeFromCartDeleted = (id: string): CartActionTypes => ({
  type: CartActions.REMOVE_FROM_CART_DELETED,
  payload: { id },
});
