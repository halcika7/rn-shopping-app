import { Property, FormState } from './formReducer';
import { AuthProperty, AuthFormState } from './authReducer';

export enum FormActions {
  INPUT_FORM_UPDATE = 'INPUT_FORM_UPDATE',
  INPUT_FORM_DIRTY_UPDATE = 'INPUT_FORM_DIRTY_UPDATE',
  SUBMIT_FORM = 'SUBMIT_FORM',
}

interface InputFormUpdate {
  type: typeof FormActions.INPUT_FORM_UPDATE;
  payload: { val: string; isValid: boolean; property: Property | AuthProperty };
}

interface InputDirtyUpdate {
  type: typeof FormActions.INPUT_FORM_DIRTY_UPDATE;
  payload: { property: Property | AuthProperty };
}

interface SubmitForm {
  type: typeof FormActions.SUBMIT_FORM;
  payload: { submitting: boolean };
}

export type FormActionTypes = InputFormUpdate | InputDirtyUpdate | SubmitForm;

export function formReducer<T extends FormState | AuthFormState>() {
  return function fn(state: T, action: FormActionTypes) {
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
}

// export function formReducer<T extends FormState | AuthFormState>(
//   state: T,
//   action: FormActionTypes
// ) {}
