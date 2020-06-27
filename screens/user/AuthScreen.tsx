import React, { useReducer, useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  View,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '../../components/UI/Card';
import FormControl from '../../components/UI/FormControl';
import colors from '../../constants/colors';
import { useThunkDispatch } from '../../store/AppThunkDispatch';
import { formReducer, FormActions } from '../../forms/formDefaults';
import {
  AuthFormState,
  getInitialAuthFormState,
  AuthProperty,
} from '../../forms/authReducer';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';
import { signUp, logIn } from '../../store/actions';
import Loading from '../../components/UI/Loading';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 10,
  },
});

const AuthScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [isSignUp, setIsSignuUp] = useState<boolean>(false);
  const dispatch = useThunkDispatch();
  const { email, password } = useSelector(
    (state: AppState) => state.auth.values
  );
  const [formState, reducerDispatch] = useReducer(
    formReducer<AuthFormState>(),
    getInitialAuthFormState(email, password)
  );

  const submitHandler = useCallback(async () => {
    const {
      email: enteredEmail,
      password: enteredPassword,
    } = formState.inputValues;

    reducerDispatch({
      type: FormActions.SUBMIT_FORM,
      payload: { submitting: true },
    });

    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'Okay' },
      ]);
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      if (!isSignUp) {
        await dispatch(logIn(enteredEmail, enteredPassword));
      } else {
        await dispatch(signUp(enteredEmail, enteredPassword));
      }
      // navigation.navigate('Shop');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, formState]);

  const inputChangeHandler = (val: string, property: AuthProperty) => {
    let isValid = false;

    if (val.length > 0) {
      reducerDispatch({
        type: FormActions.INPUT_FORM_DIRTY_UPDATE,
        payload: { property },
      });
    }

    if (
      val.trim().length > 0 ||
      (property === 'password' && val.trim().length > 5)
    ) {
      isValid = true;
    }

    reducerDispatch({
      type: FormActions.INPUT_FORM_UPDATE,
      payload: { isValid, val, property },
    });
  };

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <FormControl
              value={formState.inputValues.email}
              label="E-Mail"
              keyboard="email-address"
              autoCapitalize="none"
              dirty={formState.inputDirty.email}
              error="Please enter a valid email address."
              property="email"
              valid={formState.inputValidities.email}
              onTextChange={inputChangeHandler}
            />
            <FormControl
              value={formState.inputValues.password}
              label="Password"
              keyboard="default"
              autoCapitalize="none"
              dirty={formState.inputDirty.password}
              error="Please enter a valid password."
              property="password"
              valid={formState.inputValidities.password}
              onTextChange={inputChangeHandler}
              secureTextEntry
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <Loading size="small" />
              ) : (
                <Button
                  title={!isSignUp ? 'Login' : 'Sign Up'}
                  color={colors.primary}
                  onPress={submitHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignUp ? 'Login' : 'SignUp'}`}
                color={colors.accent}
                onPress={() => setIsSignuUp(prev => !prev)}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export const screenOptions = {
  headerTitle: 'Authenticate',
};

export default AuthScreen;
