/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { PropsWithChildren, JSX } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { useGetUserQuery } from "./src/state/apis/authApi";
import SignIn from "./src/components/auth/Signin";
import styles from "./src/baseStyles";
import { store } from "./src/state/store";
import Popup from "./src/components/reusable/Popup";
import MainNavigator from "./src/components/MainNavigator";

GoogleSignin.configure({
  iosClientId:
    "385802469502-ahjvbdemirgu21ur31n80og3c67k1i7f.apps.googleusercontent.com",
});

export type RootStackParamList = {
  SignIn: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppContainer = () => {
  const { data: user } = useGetUserQuery();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.app} edges={{ top: "maximum" }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            {!user ? (
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{ title: "Sign in to the CK Home Chef App" }}
              />
            ) : (
              <Stack.Screen name="Main" component={MainNavigator} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <PaperProvider>{children}</PaperProvider>
    </Provider>
  );
};

export function App(): JSX.Element {
  return (
    <Providers>
      <AppContainer />
      <Popup />
    </Providers>
  );
}

export default App;
