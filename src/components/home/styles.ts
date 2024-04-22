import {StyleSheet} from 'react-native';

import {colors} from '../shiftSignup/styles';

export default StyleSheet.create({
  home: {
    minHeight: '100%',
    backgroundColor: colors.beige,
    paddingVertical: 25,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  homeTitleText: {
    fontSize: 22,
    textAlign: 'center',
  },
  signOutBtn: {
    backgroundColor: 'purple',
    marginTop: 10,
    alignSelf: 'center',
  },
  signOutBtnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 10,
  },
  homeInfo: {
    justifyContent: 'space-around',
    padding: 15,
    borderTopWidth: 1,
    marginTop: 10,
  },
  homeInfoItems: {
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  homeInfoTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 5,
  },
  homeInfoText: {
    fontSize: 16,
    textAlign: 'left',
    marginVertical: 5,
  },
  notificationsList: {
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'grey',
    padding: 10,
    backgroundColor: 'white',
  },
  notificationsItem: {marginBottom: 10},
  notificationDate: {
    flexDirection: 'row',
  },
  notificationDateText: {
    fontWeight: '600',
    marginRight: 5,
    fontSize: 14,
    marginBottom: 10,
  },
  notificationsTitle: {
    fontWeight: '600',
    marginBottom: 5,
    fontSize: 14,
    textAlign: 'center',
  },
});
