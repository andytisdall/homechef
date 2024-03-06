import {useState, useRef} from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput as NativeTextInput,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';

import {setError} from '../../state/slices/errorSlice';
import Btn from '../reusable/Btn';
import reusableStyles from '../reusable/styles';
import styles from './styles';
import Loading from '../reusable/Loading';
import Title from '../reusable/Title';
import {
  useGetUserQuery,
  useSignInMutation,
  useGoogleSignInMutation,
  useAppleSignInMutation,
} from '../../state/apis/authApi';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {data: user} = useGetUserQuery();
  const [signIn, signInResult] = useSignInMutation();
  const [googleSignIn, googleSignInResult] = useGoogleSignInMutation();
  const [appleSignIn, appleSignInResult] = useAppleSignInMutation();

  const dispatch = useDispatch();

  const passwordFieldRef = useRef<NativeTextInput | null>(null);

  const handleSubmit = () => {
    signIn({username, password});
  };

  const submitGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.user.familyName && userInfo.user.givenName) {
        googleSignIn({...userInfo.user, googleId: userInfo.user.id});
      }
    } catch (err: any) {
      if (err.code !== statusCodes.SIGN_IN_CANCELLED) {
        dispatch(setError('Google Sign In Failed'));
      }
    }
  };

  const onAppleButtonPress = async () => {
    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        // Note: it appears putting FULL_NAME first is important, see issue #293
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
        const appleSignInArgs = {
          ...appleAuthRequestResponse,
          id: appleAuthRequestResponse.user,
          givenName: appleAuthRequestResponse.fullName?.givenName,
          familyName: appleAuthRequestResponse.fullName?.familyName,
        };
        appleSignIn(appleSignInArgs);
      }
    } catch (err) {
      console.log(err);
      dispatch(setError('Apple Login Failed'));
    }
  };

  const loading =
    signInResult.isLoading ||
    googleSignInResult.isLoading ||
    appleSignInResult.isLoading;

  if (loading) {
    return (
      <View style={styles.signin}>
        <Loading />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={reusableStyles.scrollView}>
      <View style={styles.signin}>
        <Title headerText="Home Chef App" />
        <View style={styles.CKSignin}>
          <Text style={styles.signinText}>Sign in with your CK username</Text>

          <View style={styles.signinFields}>
            <TextInput
              style={styles.authInput}
              value={username}
              onChangeText={setUsername}
              textColor="black"
              placeholder="Username"
              blurOnSubmit
              returnKeyType="next"
              placeholderTextColor="grey"
              onSubmitEditing={() => {
                if (passwordFieldRef.current) {
                  passwordFieldRef.current.focus();
                }
              }}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.authInput}
              value={password}
              onChangeText={setPassword}
              textColor="black"
              placeholder="Password"
              blurOnSubmit
              returnKeyType="next"
              ref={passwordFieldRef}
              onSubmitEditing={handleSubmit}
              secureTextEntry
              placeholderTextColor="grey"
            />
            <Text>{!!user && user.username}</Text>
            <Btn style={styles.signinBtn} onPress={handleSubmit}>
              <Text style={styles.signinBtnText}>Sign In</Text>
            </Btn>
          </View>
        </View>
        <Text style={styles.signinText}>Or</Text>
        <View style={styles.googleSignIn}>
          <Pressable onPress={submitGoogleSignIn}>
            {({pressed}) => {
              const googleImg = pressed
                ? require('../../assets/google-pressed.png')
                : require('../../assets/google.png');
              return (
                <Image
                  source={googleImg}
                  alt="Google Sign In"
                  style={styles.googleSignInBtn}
                />
              );
            }}
          </Pressable>
        </View>
        {Platform.OS === 'ios' && (
          <AppleButton
            buttonStyle={AppleButton.Style.BLACK}
            buttonType={AppleButton.Type.SIGN_IN}
            style={styles.appleSignIn}
            onPress={onAppleButtonPress}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default SignIn;
