import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  scrollView: {
    minHeight: '100%',
  },
  sendText: {
    paddingBottom: 75,
    paddingHorizontal: 20,
    backgroundColor: 'rgb(30, 10, 70)',
    flex: 1,
    paddingTop: 30,
  },
  sentSuccess: {
    backgroundColor: 'rgb(111, 255, 111)',
    marginTop: 30,
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
    border: '1px solid black',
  },
  sendTextVariablesItem: {
    marginBottom: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    zIndex: 100,
  },
  sendTextLabel: {
    fontSize: 25,
    color: 'rgb(270,270,270)',
    marginHorizontal: 25,
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  sendTextInput: {
    borderWidth: 1,
    backgroundColor: 'white',
    margin: 20,
    fontSize: 25,
    padding: 5,
    minHeight: 80,
  },
  sendTextNumberInput: {
    width: 100,
  },
  fridgeSelect: {
    margin: 20,
  },
  fridgeButton: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 5,
    borderWidth: 1,
    width: '100%',
  },
  fridgeInfo: {
    padding: 20,
  },
  fridgeInfoLabel: {
    color: 'rgb(200,200,200)',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 25,
  },
  fridgeInfoValue: {
    fontSize: 20,
    color: 'rgb(200, 200, 250)',
  },
  sendTextNav: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sendTextNavEnd: {
    justifyContent: 'flex-end',
  },
  sendTextNavBtn: {
    backgroundColor: 'rgb(80, 130, 220)',
    width: 100,
    height: 70,
  },
  leftArrow: {transform: [{scaleX: -1}]},
  sendBtn: {
    margin: 10,
    backgroundColor: 'rgb(150,200,0)',
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 3},
    shadowOpacity: 0.3,
    width: '60%',
  },
  sendBtnText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  textPreview: {alignItems: 'center'},
  textPreviewText: {
    fontSize: 20,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'rgb(150,150,200)',
    paddingVertical: 10,
    marginVertical: 25,
    color: 'rgb(220,220,250)',
  },
  textPreviewTitle: {
    fontSize: 30,
    marginBottom: 10,
    color: 'white',
  },
  textPreviewRegion: {
    fontSize: 20,
    color: 'white',
  },
  textPreviewBtns: {
    alignItems: 'center',
    marginVertical: 10,
  },
  cancel: {
    backgroundColor: 'rgb(150,150,250)',
  },
  picker: {
    borderWidth: 1,
    height: 400,
    backgroundColor: 'white',
  },
  backBtn: {
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: 'rgb(220,220,250)',
    width: '50%',
    alignSelf: 'center',
    marginTop: 20,
    padding: 20,
  },
  backBtnText: {
    textAlign: 'center',
    fontSize: 15,
  },
  dropdownContainer: {
    padding: 10,
    borderWidth: 1,
    height: 'fit-content',
  },
  dropdownText: {
    fontWeight: '600',
    fontSize: 20,
  },
});

export const placeholderColor = 'rgba(80,120,200, .6)';
