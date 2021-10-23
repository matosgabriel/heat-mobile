import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 36,
  },

  message: {
    fontFamily: FONTS.REGULAR,
    fontSize: 16,
    color: COLORS.WHITE,
    lineHeight: 20,
    marginBottom: 12,
  },

  user: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  userName: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    color: COLORS.GRAY_PRIMARY,
    marginLeft: 12,
  },
});