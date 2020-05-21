import React from 'react';
import {View} from 'native-base';
import {StyleSheet} from 'react-native';
import colors from '../config/colors';

const ListItem = ({children}) => {
  return <View style={styles.item}>{children}</View>;
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.WHITE,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default ListItem;
