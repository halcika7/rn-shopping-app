import { Product } from '../../models/product';

export enum ProductActions {
  GET_PRODUCTS = 'GET_PRODUCTS',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
  CREATE_PRODUCT = 'CREATE_PRODUCT',
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
}

interface UpdateProductI {
  description: string;
  imageUrl: string;
  title: string;
}

export interface CreateProductType extends UpdateProductI {
  price: number;
}

export interface UpdateProductType extends UpdateProductI {
  id: string;
}

interface GetProducts {
  type: typeof ProductActions.GET_PRODUCTS;
  payload: { products: Product[] };
}

interface DeleteProduct {
  type: typeof ProductActions.DELETE_PRODUCT;
  payload: { id: string };
}

interface CreateProduct {
  type: typeof ProductActions.CREATE_PRODUCT;
  payload: CreateProductType & { id: string };
}

interface UpdateProduct {
  type: typeof ProductActions.UPDATE_PRODUCT;
  payload: UpdateProductType;
}

export type ProductActionTypes =
  | DeleteProduct
  | CreateProduct
  | UpdateProduct
  | GetProducts;
