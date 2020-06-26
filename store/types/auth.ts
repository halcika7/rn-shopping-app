export enum AuthActions {
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_FAILED = 'AUTH_FAILED',
  LOGOUT = 'LOGOUT',
}

interface AuthSuccess {
  type: typeof AuthActions.AUTH_SUCCESS;
  payload: { token: string; userId: string };
}

interface AuthFailed {
  type: typeof AuthActions.AUTH_FAILED;
  payload: { email: string; password: string };
}

interface Logout {
  type: typeof AuthActions.LOGOUT;
  payload: {};
}

export type AuthActionTypes = AuthSuccess | AuthFailed | Logout;
