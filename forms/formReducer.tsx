import { Product } from '../models/product';

export interface FormState {
  inputValues: {
    title: string;
    price: string;
    imageUrl: string;
    description: string;
  };
  inputValidities: {
    title: boolean;
    price: boolean;
    imageUrl: boolean;
    description: boolean;
  };
  inputDirty: {
    title: boolean;
    price: boolean;
    imageUrl: boolean;
    description: boolean;
  };
  formIsValid: boolean;
  formSubmitted: boolean;
}

export type Property = 'title' | 'description' | 'price' | 'imageUrl';

export const getInitialFormState = (
  product: Product | undefined
): FormState => ({
  inputValues: {
    title: product?.title || '',
    price: product?.price.toString() || '',
    imageUrl: product?.imageUrl || '',
    description: product?.description || '',
  },
  inputValidities: {
    title: !!product?.title,
    price: !!product?.price,
    imageUrl: !!product?.imageUrl,
    description: !!product?.description,
  },
  inputDirty: {
    title: false,
    price: false,
    imageUrl: false,
    description: false,
  },
  formIsValid: !!product,
  formSubmitted: false,
});
