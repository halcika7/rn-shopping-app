export class CartItem {
  private readonly _quantity: number;

  private readonly _price: number;

  private readonly _title: string;

  private readonly _sum: number;

  constructor(quantity: number, price: number, title: string, sum: number) {
    this._quantity = quantity;
    this._price = price;
    this._title = title;
    this._sum = sum;
  }

  get quantity(): number {
    return this._quantity;
  }

  get price(): number {
    return this._price;
  }

  get title(): string {
    return this._title;
  }

  get sum(): number {
    return this._sum;
  }
}
