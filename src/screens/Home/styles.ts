import { StyleSheet } from 'react-native';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';

import { COLORS, FONTS } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK_SECONDARY,  
    paddingTop: getStatusBarHeight() + 17,
  },

  messageList: {
    flex: 1,
    paddingHorizontal: 20,
  },

  messageListContent: {
    paddingTop: 135,
    paddingBottom: 185,
  },

  signInBox: {
    alignItems: 'center',
    justifyContent: 'center',
    
    height: 48,
    paddingHorizontal: 20,
    paddingVertical: getBottomSpace() + 32,
  },

  sendMessageForm: {
    width: '100%',
    height: 185,
    backgroundColor: COLORS.BLACK_TERTIARY,
    paddingBottom: getBottomSpace(),
    paddingTop: 16,
    paddingHorizontal: 24,
  },

  sendMessageInput: {
    width: '100%',
    height: 88,
    textAlignVertical: 'top',
    color: COLORS.WHITE,
    fontFamily: FONTS.REGULAR,
  },
});