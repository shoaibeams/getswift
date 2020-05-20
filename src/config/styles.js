import {StyleSheet} from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  txtBg: {
    fontSize: 20,
    lineHeight: 50,
  },
  txtMd: {
    fontSize: 16,
    lineHeight: 50,
  },
  txtSm: {
    fontSize: 12,
  },
  linkText: {
    fontSize: 16,
    lineHeight: 50,
    color: colors.PRIMARY,
  },
  rightAlignedText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtGrey: {
    color: colors.GREY,
  },
  txtGreen: {
    color: colors.GREEN,
  },
  centerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
