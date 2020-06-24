import { CartActionTypes, CartActions } from '../types/cart';
import { CartItem } from '../../models/cart-item';

export type CartItemType = { [key: string]: CartItem };

export interface CartState {
  items: CartItemType;
  totalAmount: number;
}

const INITIAL_STATE: CartState = {
  items: {},
  totalAmount: 0,
};

export function CartReducer(state = INITIAL_STATE, action: CartActionTypes) {
  switch (action.type) {
    case CartActions.ADD_TO_CART: {
      const { id, price, title } = action.payload.product;
      const existingProduct = state.items[`${id}`];
      let item: CartItem;

      if (existingProduct) {
        const { quantity, sum } = existingProduct;
        item = new CartItem(quantity + 1, price, title, sum + price);
      } else {
        item = new CartItem(1, price, title, price);
      }

      return {
        items: { ...state.items, [id]: item },
        totalAmount: state.totalAmount + price,
      };
    }
    case CartActions.REMOVE_FROM_CART: {
      const { id } = action.payload;
      const items = { ...state.items };
      let item = state.items[`${id}`];
      const totalAmount = state.totalAmount - item.price;

      if (item.quantity > 1) {
        item = new CartItem(
          item.quantity - 1,
          item.price,
          item.title,
          item.sum - item.price
        );

        items[`${id}`] = item;
      } else {
        delete items[`${id}`];
      }

      return { items, totalAmount };
    }
    case CartActions.REMOVE_FROM_CART_DELETED: {
      const { id } = action.payload;
      const items = { ...state.items };
      const item = state.items[`${id}`];
      let { totalAmount } = state;

      if (item) {
        totalAmount -= item.sum;
        delete items[`${id}`];
      }

      return { items, totalAmount };
    }
    case CartActions.CLEAR_CART:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
}
