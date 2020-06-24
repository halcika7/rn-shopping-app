import { combineReducers, Reducer } from 'redux';

import { ProductsReducer as products, ProductsState } from './products';
import { CartReducer as cart, CartState } from './cart';
import { OrderReducer as order, OrderState } from './order';

export interface AppState {
  products: ProductsState;
  cart: CartState;
  order: OrderState;
}

export const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  products,
  cart,
  order,
});
