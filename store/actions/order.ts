import { OrderActions, OrderItem } from '../types/order';
import { AppThunkDispatch } from '../AppThunkDispatch';
import { clearCart } from './cart';
import { CartItem } from '../../models/cart-item';
import { Order } from '../../models/order';
import { AppState } from '../reducers';

export const addOrder = (items: OrderItem[], amount: number) => async (
  dispatch: AppThunkDispatch,
  getState: () => AppState
) => {
  const date = new Date();
  const {
    auth: { token, userId },
  } = getState();

  const response = await fetch(
    `https://rn-shopping-app-2bed2.firebaseio.com/orders/${userId}.json?auth=${token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items,
        amount,
        date: date.toISOString(),
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  const resData = await response.json();

  dispatch({
    type: OrderActions.ADD_ORDER,
    payload: { items, amount, id: resData.name, date },
  });

  return dispatch(clearCart());
};

export const getOrders = () => async (
  dispatch: AppThunkDispatch,
  getState: () => AppState
) => {
  try {
    const {
      auth: { userId },
    } = getState();
    const response = await fetch(
      `https://rn-shopping-app-2bed2.firebaseio.com/orders/${userId}.json`
    );

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const resData = (await response.json()) as {
      [key: string]: Order;
    };

    type Resp = [string, Order];

    let orders: Order[] = [];

    if (resData && Object.keys(resData).length) {
      orders = Object.entries(resData).map(
        ([id, { items, amount, date }]: Resp) => {
          const OrderItems = items.map(
            ({ id: itemId, item: { price, title, quantity, sum } }) => ({
              id: itemId,
              item: new CartItem(quantity, price, title, sum),
            })
          );

          return new Order(id, OrderItems, amount, new Date(date));
        }
      );
    }
    return dispatch({
      type: OrderActions.FETCH_ORDERS,
      payload: { orders },
    });
  } catch (error) {
    console.log('getOrders -> error', error);
    throw error;
  }
};
