import {StyleSheet} from 'react-native';
export const colors = {
  beige: 'rgb(231, 206, 166)',
  dark: 'rgb(10, 110, 189)',
  med: 'rgb(90, 150, 227)',
  light: 'rgb(161, 194, 241)',
  green: 'rgba(20, 200, 50, .5)',
  lightGreen: 'rgba(70, 250, 100, .5)',

  red: 'rgba(200, 70, 70, .5)',
  grey: 'rgba(100,100,100,.5)',
  highlight: 'rgba(250,250,250, .5)',
  white: 'white',
};

export default StyleSheet.create({
  scrollView: {
    minHeight: '100%',
  },
  flatList: {flex: 1},
  main: {backgroundColor: colors.light, flex: 1, paddingHorizontal: 10},
  section: {
    paddingTop: 30,
  },
  title: {fontSize: 25, textAlign: 'center'},
  textSmall: {fontSize: 15},
  textMed: {fontSize: 17},
  textLarge: {fontSize: 20},
});
