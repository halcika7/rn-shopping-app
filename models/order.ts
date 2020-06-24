import { OrderItem } from '../store/types/order';

type m = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

const months = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sept',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
};

const formatHours = (num: number) => (num > 9 ? num : `0${num}`);

const formatDay = (num: number) => {
  let ord = 'th';
  const st = [1, 21, 31];
  const nd = [2, 22, 32];
  const rd = [3, 23];

  if (st.includes(num)) {
    ord = 'st';
  } else if (nd.includes(num)) {
    ord = 'nd';
  } else if (rd.includes(num)) {
    ord = 'rd';
  }

  return `${formatHours(num)}${ord}`;
};

export class Order {
  private readonly _id: string;

  private readonly _items: OrderItem[];

  private readonly _amount: number;

  private readonly _date: Date;

  constructor(id: string, items: OrderItem[], amount: number, date: Date) {
    this._id = id;
    this._items = items;
    this._amount = amount;
    this._date = date;
  }

  get id(): string {
    return this._id;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  get amount(): number {
    return this._amount;
  }

  get date(): string {
    const year = this._date.getFullYear();
    const month = months[this._date.getMonth() as m];
    const day = formatDay(this._date.getDate());
    const hour = formatHours(this._date.getHours());
    const min = formatHours(this._date.getMinutes());

    return `${month} ${day} ${year}, ${hour}:${min}`;
  }
}
