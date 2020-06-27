export enum AuthActions {
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_FAILED = 'AUTH_FAILED',
  LOGOUT = 'LOGOUT',
  AUTH_AUTO = 'AUTH_AUTO',
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

interface AuthAuto {
  type: typeof AuthActions.AUTH_AUTO;
  payload: {};
}

export type AuthActionTypes = AuthSuccess | AuthFailed | Logout | AuthAuto;
