/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {useGetUserQuery} from './src/state/apis/authApi';
import SignIn from './src/components/auth/Signin';
import styles from './src/baseStyles';

import {store} from './src/state/store';
import Popup from './src/components/reusable/Popup';
import MainNavigator from './src/components/MainNavigator';

GoogleSignin.configure({
  iosClientId:
    '385802469502-ahjvbdemirgu21ur31n80og3c67k1i7f.apps.googleusercontent.com',
});

export type RootStackParamList = {
  SignIn: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContainer = () => {
  const {data: user} = useGetUserQuery();

  return (
    <SafeAreaView style={styles.app}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            header: Popup,
          }}>
          {!user ? (
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{title: 'Sign in to the CK Home Chef App'}}
            />
          ) : (
            <Stack.Screen name="Main" component={MainNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppContainer />
      </PaperProvider>
    </Provider>
  );
}

export default App;
