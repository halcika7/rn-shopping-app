import { AsyncStorage } from 'react-native';
import { AppThunkDispatch } from '../AppThunkDispatch';
import { AuthActions } from '../types/auth';
import Constants from 'expo-constants';

let timer: any;

const saveDataToStorage = (token: string, userId: string, exp: string) => {
  AsyncStorage.setItem('userData', JSON.stringify({ token, userId, exp }));
};

export const logout = () => {
  AsyncStorage.removeItem('userData');

  if (timer) {
    clearTimeout(timer);
  }

  return {
    type: AuthActions.LOGOUT,
    payload: {},
  };
};

const setLogoutTimer = (exp: number) => (dispatch: AppThunkDispatch) => {
  timer = setTimeout(() => {
    dispatch(logout());
  }, exp);
};

export const authSuccess = (resData: {
  idToken: string;
  localId: string;
  exp: number;
}) => (dispatch: AppThunkDispatch) => {
  dispatch(setLogoutTimer(resData.exp));
  return dispatch({
    type: AuthActions.AUTH_SUCCESS,
    payload: { token: resData.idToken, userId: resData.localId },
  });
};

export const signUp = (email: string, password: string) => async (
  dispatch: AppThunkDispatch
) => {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${Constants.manifest.extra.key}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    }
  );

  if (!response.ok) {
    const err = await response.json();
    const errorId = err.error.message;
    let message = 'Something went wrong';
    if (errorId === 'EMAIL_EXISTS') {
      message = 'This email exists already!';
    }
    dispatch({
      type: AuthActions.AUTH_FAILED,
      payload: { email, password },
    });
    throw new Error(message);
  }

  const resData = await response.json();

  const exp = new Date(
    new Date().getTime() + parseInt(resData.expiresIn, 10) * 1000
  ).toISOString();
  saveDataToStorage(resData.idToken, resData.localId, exp);

  return dispatch(
    authSuccess({ ...resData, exp: parseInt(resData.expiresIn, 10) * 1000 })
  );
};

export const logIn = (email: string, password: string) => async (
  dispatch: AppThunkDispatch
) => {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${Constants.manifest.extra.key}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    }
  );

  if (!response.ok) {
    const err = await response.json();
    const errorId = err.error.message;
    let message = 'Something went wrong';
    if (errorId === 'EMAIL_NOT_FOUND') {
      message = 'This email could not be found!';
    } else if (errorId === 'INVALID_PASSWORD') {
      message = 'This password is not vallid!';
    }
    dispatch({
      type: AuthActions.AUTH_FAILED,
      payload: { email, password },
    });
    throw new Error(message);
  }

  const resData = await response.json();

  const exp = new Date(
    new Date().getTime() + parseInt(resData.expiresIn, 10) * 1000
  ).toISOString();
  saveDataToStorage(resData.idToken, resData.localId, exp);

  return dispatch(
    authSuccess({ ...resData, exp: parseInt(resData.expiresIn, 10) * 1000 })
  );
};
