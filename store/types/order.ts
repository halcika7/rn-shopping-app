import { CartItem } from '../../models/cart-item';

export enum OrderActions {
  ADD_ORDER = 'ADD_ORDER',
  FETCH_ORDERS = 'FETCH_ORDERS',
}

export type OrderItem = { item: CartItem; id: string };

interface AddOrder {
  type: typeof OrderActions.ADD_ORDER;
  payload: { items: OrderItem[]; amount: number; id: string; date: Date };
}

interface GetOrders {
  type: typeof OrderActions.FETCH_ORDERS;
  payload: { orders: OrderItem[] };
}

export type OrderActionTypes = AddOrder | GetOrders;
