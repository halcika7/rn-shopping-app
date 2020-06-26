import React, { useEffect, useRef } from 'react';
import MainNavigation from './MainNavigator';
import { useSelector } from 'react-redux';
import { AppState } from '../store/reducers';
import { NavigationActions } from 'react-navigation';

const Navigation = () => {
  const navRef = useRef<any>();
  const isAuth = useSelector((state: AppState) => !!state.auth.token);

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: 'Auth' })
      );
    }
  }, [isAuth]);

  return <MainNavigation ref={navRef} />;
};

export default Navigation;
