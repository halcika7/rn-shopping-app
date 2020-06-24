import { Product } from '../models/product';

interface FormState {
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

export enum FormActions {
  INPUT_FORM_UPDATE = 'INPUT_FORM_UPDATE',
  INPUT_FORM_DIRTY_UPDATE = 'INPUT_FORM_DIRTY_UPDATE',
  SUBMIT_FORM = 'SUBMIT_FORM',
}

export type Property = 'title' | 'description' | 'price' | 'imageUrl';

interface InputFormUpdate {
  type: typeof FormActions.INPUT_FORM_UPDATE;
  payload: { val: string; isValid: boolean; property: Property };
}

interface InputDirtyUpdate {
  type: typeof FormActions.INPUT_FORM_DIRTY_UPDATE;
  payload: { property: Property };
}

interface SubmitForm {
  type: typeof FormActions.SUBMIT_FORM;
  payload: { submitting: boolean };
}

type ActionTypes = InputFormUpdate | InputDirtyUpdate | SubmitForm;

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

export const formReducer = (state: FormState, action: ActionTypes) => {
  switch (action.type) {
    case FormActions.INPUT_FORM_UPDATE: {
      const inputValues = {
        ...state.inputValues,
        [action.payload.property]: action.payload.val,
      };
      const inputValidities = {
        ...state.inputValidities,
        [action.payload.property]: action.payload.isValid,
      };

      let formIsValid = true;

      Object.values(inputValidities).forEach(val => {
        formIsValid = formIsValid && val;
      });

      return { ...state, formIsValid, inputValues, inputValidities };
    }
    case FormActions.INPUT_FORM_DIRTY_UPDATE: {
      const inputDirty = {
        ...state.inputDirty,
        [action.payload.property]: true,
      };

      return { ...state, inputDirty };
    }
    case FormActions.SUBMIT_FORM:
      return { ...state, formSubmitted: action.payload.submitting };
    default:
      return state;
  }
};
