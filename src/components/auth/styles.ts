import {StyleSheet} from 'react-native';

import {colors} from '../shiftSignup/styles';

export default StyleSheet.create({
  signin: {
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: colors.beige,
    flex: 1,
    borderWidth: 1,
    paddingVertical: 25,
  },
  CKSignin: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 30,
  },
  signinBtnText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    padding: 5,
  },
  signinBtn: {
    marginTop: 10,
    backgroundColor: 'rgb(160,60,200)',
    borderWidth: 2,
  },
  signinText: {fontSize: 20, textAlign: 'center'},
  authInput: {
    backgroundColor: 'white',
    marginBottom: 10,
    borderWidth: 1,
  },
  signinFields: {
    marginTop: 20,
    width: '80%',
  },
  googleSignIn: {
    alignItems: 'center',
    marginTop: 20,
    height: 70,
  },
  googleSignInBtn: {
    flex: 1,
    resizeMode: 'contain',
  },
  appleSignIn: {
    marginTop: 20,
    width: '75%',
    height: 60,
  },
});
