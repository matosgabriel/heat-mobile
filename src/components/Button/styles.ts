import { StyleSheet } from 'react-native';
import { FONTS } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',

    height: 48,
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10
  },

  title: {
    fontFamily: FONTS.BOLD,
    fontSize: 14,
  },
});