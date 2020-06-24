import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Property } from '../../forms/formReducer';

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
    marginBottom: 10,
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  invalidText: {
    marginTop: 5,
    color: 'red',
    fontSize: 13,
    fontFamily: 'open-sans',
  },
});

interface Props {
  value: string;
  label: string;
  error: string;
  dirty: boolean;
  valid: boolean;
  property: Property;
  onTextChange: (val: string, property: Property) => void;
  keyboard?: 'decimal-pad' | 'default';
  autoCapitalize?: 'sentences' | 'none';
  autoCorrect?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
}

const FormControl = ({
  value,
  label,
  dirty,
  valid,
  property,
  error,
  onTextChange,
  keyboard = 'default',
  autoCapitalize = 'sentences',
  autoCorrect = false,
  multiline = false,
  numberOfLines = 1,
}: Props) => {
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={
          !valid && dirty
            ? { ...styles.input, borderBottomColor: 'red' }
            : styles.input
        }
        value={value}
        onChangeText={(val: string) => onTextChange(val, property)}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        returnKeyType="next"
        keyboardType={keyboard}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
      {!valid && dirty && <Text style={styles.invalidText}>{error}</Text>}
    </View>
  );
};

export default FormControl;
