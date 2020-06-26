import { combineReducers, Reducer } from 'redux';

import { ProductsReducer as products, ProductsState } from './products';
import { CartReducer as cart, CartState } from './cart';
import { OrderReducer as order, OrderState } from './order';
import { AuthReducer as auth, AuthState } from './auth';

export interface AppState {
  products: ProductsState;
  cart: CartState;
  order: OrderState;
  auth: AuthState;
}

export const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  products,
  cart,
  order,
  auth,
});
