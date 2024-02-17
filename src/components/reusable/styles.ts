import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  scrollView: {
    minHeight: '100%',
  },
  appTitleContainer: {
    width: '100%',
  },
  appTitleImageContainer: {
    height: 100,
    justifyContent: 'center',
  },
  appTitleImage: {
    resizeMode: 'contain',
    width: '100%',
  },
  appSubTitle: {
    paddingTop: 10,
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '600',
  },
  popup: {
    display: 'flex',
    minHeight: 60,
    padding: 20,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
  },
  popupText: {
    fontSize: 20,
    textAlign: 'center',
  },
  error: {
    backgroundColor: 'rgb(200,50,50)',
  },
  alert: {
    backgroundColor: 'rgb(50,200,50)',
  },
  photo: {
    marginTop: 20,
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'rgb(20,70,200)',
    margin: 10,
    width: '50%',
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 3},
    shadowOpacity: 0.3,
  },
  btnText: {
    paddingVertical: 10,
    fontSize: 17,
    textAlign: 'center',
    color: 'white',
    paddingHorizontal: 10,
  },
  photoPreview: {
    height: 330,
    width: '100%',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoDelete: {
    height: 35,
    width: 35,
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: 'rgb(230,230,230)',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoDeleteText: {color: 'red', fontSize: 20},
  photoPreviewPhoto: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
  },
});
