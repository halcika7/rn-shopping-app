import { AuthActionTypes, AuthActions } from '../types/auth';

export interface AuthState {
  values: {
    email: string;
    password: string;
  };
  token: string;
  userId: string;
}

const INITIAL_STATE: AuthState = {
  values: {
    email: '',
    password: '',
  },
  token: '',
  userId: '',
};

export function AuthReducer(state = INITIAL_STATE, action: AuthActionTypes) {
  switch (action.type) {
    case AuthActions.AUTH_SUCCESS: {
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      };
    }
    case AuthActions.AUTH_FAILED: {
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
      };
    }
    case AuthActions.LOGOUT:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
}
