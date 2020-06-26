export interface AuthFormState {
  inputValues: {
    email: string;
    password: string;
  };
  inputValidities: {
    email: boolean;
    password: boolean;
  };
  inputDirty: {
    email: boolean;
    password: boolean;
  };
  formIsValid: boolean;
  formSubmitted: boolean;
}

export type AuthProperty = 'email' | 'password';

export const getInitialAuthFormState = (
  email: string,
  password: string
): AuthFormState => ({
  inputValues: {
    email: email || '',
    password: password || '',
  },
  inputValidities: {
    email: !!email,
    password: !!password,
  },
  inputDirty: {
    email: false,
    password: false,
  },
  formIsValid: !!email && !!password,
  formSubmitted: false,
});
