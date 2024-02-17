import {StyleSheet} from 'react-native';

import {colors} from '../shiftSignup/styles';

export default StyleSheet.create({
  chefHeader: {
    paddingVertical: 20,
  },
  chefHeaderText: {fontSize: 30, textAlign: 'center', paddingBottom: 10},
  chefHeaderSubText: {fontSize: 15, textAlign: 'center'},
  chefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  chefSubRow: {
    justifyContent: 'center',
    flexGrow: 1,
    alignItems: 'center',
  },
  arrow: {width: 20, height: 20, marginRight: 10},
  arrowDown: {transform: [{rotate: '90deg'}]},

  chefListHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  chefList: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    marginBottom: 20,
  },
  editBtn: {
    backgroundColor: colors.med,
    marginRight: 10,
  },
  chefInfo: {
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  chefPhotos: {flexDirection: 'row', height: 150},
  chefPhoto: {
    flex: 1,
    height: '100%',
    resizeMode: 'contain',
  },
  signupBtn: {
    marginVertical: 20,
    backgroundColor: colors.beige,
  },
  mealCountInput: {width: 75, backgroundColor: 'white'},
  chefNoShifts: {
    marginLeft: 60,
  },
});
