import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { AppState } from './reducers';

export type AppThunkDispatch = ThunkDispatch<AppState, {}, AnyAction>;

export const useThunkDispatch = (): AppThunkDispatch =>
  useDispatch<AppThunkDispatch>();
