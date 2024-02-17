import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  tabIconContainer: {padding: 2},
  tabIcon: {
    flex: 1,
    height: '100%',
    resizeMode: 'contain',
    width: '100%',
    // opacity: 0.6,
  },
  tabLabel: {fontSize: 15},
  focusedText: {
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  focusedIcon: {
    opacity: 1,
  },
});
