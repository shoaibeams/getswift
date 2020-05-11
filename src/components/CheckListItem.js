import React, {useEffect, useState} from 'react';
import {View, Text, Input, Icon} from 'native-base';
import {CheckBox, StyleSheet} from 'react-native';
import colors from '../config/colors';
import {useForm} from 'react-hook-form';

const CheckListItem = ({description, quantity}) => {
  const {register, handleSubmit, setValue} = useForm();
  const [isSelected, setSelection] = useState(false);

  useEffect(() => {
    register(
      {name: 'quantity'},
      {
        required: 'Quantity is required',
      },
    );
  }, [register]);

  const handleQuantityChange = quantity => {
    setValue('quantity', quantity);
  };

  return (
    <View style={styles.item}>
      <CheckBox value={isSelected} onValueChange={setSelection} />
      <Text>{description}</Text>
      <View style={styles.inputContainer}>
        <Input style={styles.textInput} onChangeText={handleQuantityChange} />
      </View>
      <Text>/1 </Text>
      <Icon name="file-plus" type="Feather" />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
    padding: 15,
    marginVertical: 1,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    // alignContent: 'space-around',
  },
  inputContainer: {
    // flex: 0.1,
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    // alignContent: 'flex-end',
  },
  textInput: {
    // height: 60,
    width: '100%',
    borderColor: colors.SILVER,
    borderBottomWidth: StyleSheet.hairlineWidth,
    // textAlign: 'left',
  },
  checkbox: {
    alignSelf: 'center',
  },
  title: {
    fontSize: 32,
  },
});

export default CheckListItem;
