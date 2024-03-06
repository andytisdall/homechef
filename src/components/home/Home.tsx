import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {useEffect} from 'react';

import Btn from '../reusable/Btn';
import {colors} from '../shiftSignup/styles';
import Title from '../reusable/Title';
import {
  useGetUserQuery,
  useSignOutMutation,
  useGetUserInfoQuery,
  useRegisterDeviceTokenMutation,
} from '../../state/apis/authApi';
import Notifications from '../../NotificationsService';

const Home = () => {
  const {data: user} = useGetUserQuery();
  const {data: userInfo} = useGetUserInfoQuery();

  const [signOut] = useSignOutMutation();
  const [registerToken] = useRegisterDeviceTokenMutation();

  useEffect(() => {
    if (user) {
      Notifications.init(({token}) => {
        if (token !== user.homeChefNotificationToken) {
          registerToken(token);
        }
      });
    }
  }, [user, registerToken]);

  let headerText = 'Home Chef App';
  if (user?.busDriver) {
    headerText = 'Mobile Oasis Delivery';
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.home}>
        <Title headerText={headerText} />
        <View style={styles.homeContent}>
          <View style={styles.homeInfo}>
            <View style={styles.homeInfoTitle}>
              <Text style={styles.homeInfoText}>
                Use the navigation buttons at the bottom of the screen to:
              </Text>
            </View>
            <View style={styles.homeInfoItems}>
              <Text style={styles.homeInfoText}>
                {'\u2022 Send a Text Alert about your Town Fridge delivery'}
              </Text>
              {userInfo?.homeChefStatus === 'Active' && (
                <>
                  <Text style={styles.homeInfoText}>
                    {'\u2022 Sign Up for Town Fridge Deliveries'}
                  </Text>
                  <Text style={styles.homeInfoText}>
                    {'\u2022 See and edit your upcoming and past deliveries'}
                  </Text>
                </>
              )}
            </View>
          </View>
          <View>
            <Text style={styles.homeTitleText}>Signed in as</Text>
            <Text style={styles.homeTitleText}>
              {userInfo?.firstName} {userInfo?.lastName}
            </Text>
            <Btn style={styles.signOutBtn} onPress={signOut}>
              <Text style={styles.signOutBtnText}>Sign Out</Text>
            </Btn>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: colors.beige,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  homeContent: {
    flex: 1,
    width: '100%',
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
  scrollView: {
    minHeight: '100%',
  },
  homeInfo: {
    flex: 1,
    justifyContent: 'space-around',
    marginVertical: 20,
    padding: 15,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  homeInfoItems: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  homeInfoText: {
    fontSize: 16,
    textAlign: 'left',
  },
  homeInfoTitle: {
    flex: 1,
  },
});

export default Home;
