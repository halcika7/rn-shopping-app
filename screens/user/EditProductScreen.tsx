import React, { useCallback, useEffect, useReducer, useState } from 'react';
// components
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import FormControl from '../../components/UI/FormControl';

// types
import { AppState } from '../../store/reducers';
import {
  Property,
  getInitialFormState,
  FormState,
} from '../../forms/formReducer';
import { formReducer, FormActions } from '../../forms/formDefaults';

// hooks
import { useSelector } from 'react-redux';
import { useThunkDispatch } from '../../store/AppThunkDispatch';
import { updateProduct, createProduct } from '../../store/actions';
import Loading from '../../components/UI/Loading';
import { useRoute, useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});

const EditProductScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { params } = useRoute() as { params: { productId: string } };
  const id = params && params.productId ? params.productId : null;
  const navigation = useNavigation();
  const prod = useSelector((state: AppState) =>
    state.products.userProducts.find(p => p.id === id)
  );
  const dispatch = useThunkDispatch();
  const [formState, reducerDispatch] = useReducer(
    formReducer<FormState>(),
    getInitialFormState(prod)
  );

  const submitHandler = useCallback(async () => {
    const data = { ...formState.inputValues };
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
      if (prod) {
        await dispatch(updateProduct({ id: id as string, ...data }));
      } else {
        await dispatch(createProduct({ ...data, price: +data.price }));
      }

      navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, prod, formState]);

  const inputChangeHandler = (val: string, property: Property) => {
    let isValid = false;

    if (val.length > 0) {
      reducerDispatch({
        type: FormActions.INPUT_FORM_DIRTY_UPDATE,
        payload: { property },
      });
    }

    if (val.trim().length > 0 || (property === 'price' && +val > 0)) {
      isValid = true;
    }

    reducerDispatch({
      type: FormActions.INPUT_FORM_UPDATE,
      payload: { isValid, val, property },
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
            }
            onPress={submitHandler}
          />
        </HeaderButtons>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitHandler]);

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <FormControl
            dirty={
              formState.inputDirty.title ||
              (formState.formSubmitted && !formState.inputValidities.title)
            }
            property="title"
            label="Title"
            valid={formState.inputValidities.title}
            value={formState.inputValues.title}
            error="Please enter a valid title!"
            onTextChange={inputChangeHandler}
            autoCorrect
          />
          <FormControl
            dirty={
              formState.inputDirty.imageUrl ||
              (formState.formSubmitted && !formState.inputValidities.imageUrl)
            }
            property="imageUrl"
            label="Image URL"
            valid={formState.inputValidities.imageUrl}
            value={formState.inputValues.imageUrl}
            error="Please enter a valid image url!"
            onTextChange={inputChangeHandler}
            autoCapitalize="none"
          />
          {!prod && (
            <FormControl
              dirty={
                formState.inputDirty.price ||
                (formState.formSubmitted && !formState.inputValidities.price)
              }
              property="price"
              label="Price"
              valid={formState.inputValidities.price}
              value={formState.inputValues.price}
              error="Please entter a valid price!"
              onTextChange={inputChangeHandler}
              keyboard="decimal-pad"
              autoCapitalize="none"
            />
          )}
          <FormControl
            dirty={
              formState.inputDirty.description ||
              (formState.formSubmitted &&
                !formState.inputValidities.description)
            }
            property="description"
            label="Description"
            valid={formState.inputValidities.description}
            value={formState.inputValues.description}
            error="Please enter a valid description!"
            onTextChange={inputChangeHandler}
            autoCorrect
            multiline
            numberOfLines={3}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const screenOptions = ({ route }: { route: any }) => {
  const params = route.params ? route.params : {};
  return {
    headerTitle: params.productId ? 'Edit Product' : 'Add Product',
  };
};

export default EditProductScreen;
