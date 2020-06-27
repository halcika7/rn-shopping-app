import React, { useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import Loading from '../components/UI/Loading';
import CenteredView from '../components/UI/CenteredView';
import { useThunkDispatch } from '../store/AppThunkDispatch';
import { authSuccess, authAutoTried } from '../store/actions';

const StartupScreen = () => {
  const dispatch = useThunkDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        dispatch(authAutoTried());
        return;
      }
      const { token, userId, exp } = JSON.parse(userData);
      const expDate = new Date(exp);

      if (expDate <= new Date() || !token || !userId) {
        dispatch(authAutoTried());
        return;
      }

      const expp = expDate.getTime() - new Date().getTime();

      // navigation.navigate('Shop');
      dispatch(authSuccess({ localId: userId, idToken: token, exp: expp }));
    };

    tryLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <CenteredView>
      <Loading />
    </CenteredView>
  );
};

export default StartupScreen;
