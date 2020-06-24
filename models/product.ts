export class Product {
  private readonly _id: string;

  private readonly _ownerId: string;

  private readonly _title: string;

  private readonly _imageUrl: string;

  private readonly _description: string;

  private readonly _price: number;

  constructor(
    id: string,
    ownerId: string,
    title: string,
    imageUrl: string,
    description: string,
    price: number
  ) {
    this._id = id;
    this._ownerId = ownerId;
    this._title = title;
    this._imageUrl = imageUrl;
    this._description = description;
    this._price = price;
  }

  get id(): string {
    return this._id;
  }

  get ownerId(): string {
    return this._ownerId;
  }

  get title(): string {
    return this._title;
  }

  get imageUrl(): string {
    return this._imageUrl;
  }

  get description(): string {
    return this._description;
  }

  get price(): number {
    return this._price;
  }
}
