import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import colors from '../config/colors';

const CustomInput = ({style, ...otherProps}) => {
  return (
    <TextInput
      selectionColor={colors.DODGER_BLUE}
      style={[styles.textInput, style]}
      {...otherProps}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: colors.SILVER,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
  },
});

export default CustomInput;
