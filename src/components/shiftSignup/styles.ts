import {Dimensions, StyleSheet} from 'react-native';
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

const height = Dimensions.get('screen').height;

export default StyleSheet.create({
  scrollView: {
    minHeight: '100%',
  },
  flatList: {flex: 1},
  homeChef: {
    backgroundColor: colors.light,
    minHeight: '100%',

    flex: 1,
    paddingHorizontal: 10,
    marginBottom: '17%',
  },
  signupMain: {
    paddingTop: 30,
  },
  signupHeader: {
    alignItems: 'center',
  },
  signupTitle: {fontSize: 25, textAlign: 'center'},
  switch: {marginTop: 10, width: '100%'},
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchTitle: {
    textAlign: 'center',
    fontSize: 20,
    color: 'grey',
  },
  switchBtn: {flex: 1, paddingHorizontal: 20},
  switchText: {textAlign: 'center', padding: 5},
  navBtn: {
    backgroundColor: colors.dark,
    marginBottom: 30,
  },
  navBtnText: {
    padding: 20,
    color: colors.white,
    fontSize: 20,
    textAlign: 'center',
  },
  viewActive: {
    transform: [{scale: 1.1}],
  },
  jobList: {paddingHorizontal: 10, paddingBottom: '20%', width: '100%'},
  jobContainer: {
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  jobHeader: {
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  jobName: {
    fontSize: 20,
  },
  jobNameSmall: {
    fontSize: 10,
  },
  arrow: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  shift: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 5,
    alignItems: 'center',
  },
  shiftSignupBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '35%',
  },
  shiftList: {
    padding: 10,
  },
  location: {
    marginBottom: 20,
    marginLeft: 5,
    fontSize: 15,
  },
  signupBtn: {
    backgroundColor: colors.dark,
  },
  signupBtnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
  },
  jobDate: {
    fontSize: 17,
    width: '35%',
  },

  jobInactiveText: {
    color: 'rgb(100,100,100)',
  },
  arrowRotated: {
    transform: [{rotate: '90deg'}],
  },
  calendarDate: {flex: 1},
  calendarLink: {
    padding: 2,
    backgroundColor: colors.green,
    flex: 1,
    paddingTop: 15,
  },
  calendarLinkNumber: {
    fontSize: height / 45,
    textAlign: 'center',
  },
  calendarLinkText: {fontSize: height / 65, textAlign: 'center'},
  calendarLinkInactive: {backgroundColor: colors.red},
  calendarLinkPressed: {backgroundColor: colors.lightGreen},
  signupDetailInfo: {
    paddingHorizontal: 5,
    marginBottom: 25,
    paddingVertical: 10,
  },
  signupField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },

  signupFieldText: {paddingLeft: 10, flexShrink: 1},
  fullShift: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: 'rgb(150,150,150)',
    borderWidth: 1,
    borderRadius: 15,
    overflow: 'hidden',
  },
  mealCountInput: {
    fontSize: 20,
    marginLeft: 25,
    width: 75,
    backgroundColor: 'white',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'rgb(100,100,250)',
  },
  checkbox: {
    paddingLeft: 15,
  },
  submitContainer: {
    alignItems: 'center',
  },
  submitBtn: {
    backgroundColor: colors.dark,
  },
  disabled: {
    backgroundColor: colors.grey,
  },
  confirmNav: {
    marginTop: 25,
    alignItems: 'center',
  },
  confirmDetail: {
    marginVertical: 20,
  },
  confirmLabel: {
    fontWeight: '600',
    marginRight: 20,
    fontSize: 20,
  },
  confirmText: {fontSize: 20, flexShrink: 1},
  confirmLine: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  highlight: {backgroundColor: colors.highlight},
  invalidDate: {
    backgroundColor: 'rgb(150,150,150)',
  },
  calendarContainer: {
    paddingBottom: 150,
  },
  jobSubHeader: {
    textAlign: 'center',
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  mealEntryText: {
    fontWeight: '600',
    fontSize: 20,
    paddingBottom: 5,
  },
  signupNotes: {
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
  },
  regionHeader: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 20,
  },
});
