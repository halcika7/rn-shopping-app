import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';

export type NavigationProps = NavigationScreenProp<
  NavigationState,
  NavigationParams
>;

export interface WithNavigation {
  navigation: NavigationProps;
}
