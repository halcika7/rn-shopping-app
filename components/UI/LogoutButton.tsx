import React from 'react';
import { View, SafeAreaView, Button } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import colors from '../../constants/colors';
import { useThunkDispatch } from '../../store/AppThunkDispatch';
import { logout } from '../../store/actions/auth';

const LogoutButton = (props: any) => {
  const dispatch = useThunkDispatch();
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <SafeAreaView>
        <DrawerItems {...props} />
        <Button
          title="Logout"
          color={colors.primary}
          onPress={() => dispatch(logout)}
        />
      </SafeAreaView>
    </View>
  );
};

export default LogoutButton;
