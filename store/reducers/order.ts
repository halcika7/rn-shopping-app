import { OrderActionTypes, OrderActions } from '../types/order';
import { Order } from '../../models/order';

export interface OrderState {
  orders: Order[];
}

const INITIAL_STATE: OrderState = {
  orders: [],
};

export function OrderReducer(state = INITIAL_STATE, action: OrderActionTypes) {
  switch (action.type) {
    case OrderActions.FETCH_ORDERS:
      return { orders: action.payload.orders };
    case OrderActions.ADD_ORDER: {
      const newOrder = new Order(
        action.payload.id,
        action.payload.items,
        action.payload.amount,
        action.payload.date
      );
      return {
        orders: state.orders.concat(newOrder),
      };
    }
    default:
      return state;
  }
}
