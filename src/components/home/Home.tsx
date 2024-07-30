import {FlatList} from 'react-native';
import {useEffect} from 'react';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useNavigation, CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Title from '../reusable/Title';
import {
  useGetUserQuery,
  useRegisterDeviceTokenMutation,
} from '../../state/apis/authApi';
import NotificationsList from './NotificationsList';
import styles from './styles';
import User from './User';
import Help from './Help';
import Notifications, {Notification} from '../../NotificationsService';
import {RootTabParamsList} from '../MainNavigator';
import {SignupStackParamsList} from '../shiftSignup/Signup';

interface NotificationData {
  screen: keyof RootTabParamsList;
  subScreen?: keyof SignupStackParamsList;
  params?: Record<string, string>;
}

const Home = () => {
  const {data: user} = useGetUserQuery();

  const navigation =
    useNavigation<
      CompositeNavigationProp<
        BottomTabNavigationProp<RootTabParamsList, 'Home'>,
        NativeStackNavigationProp<SignupStackParamsList>
      >
    >();

  useEffect(() => {
    const listenerKey = Notifications.listen((notification: Notification) => {
      try {
        const {screen, subScreen, params} =
          notification.data as NotificationData;

        if (subScreen && params) {
          // @ts-ignore
          navigation.navigate(screen, {
            screen: subScreen,
            params: params,
          });
        } else if (subScreen) {
          // @ts-ignore
          navigation.navigate(screen, {
            screen: subScreen,
          });
        } else {
          // @ts-ignore
          navigation.navigate(screen);
        }
      } catch (err) {
        console.log('Malformed notification data');
      }
    });
    return () => Notifications.remove(listenerKey);
  }, [navigation]);

  const [registerToken] = useRegisterDeviceTokenMutation();

  useEffect(() => {
    if (user) {
      Notifications.register(token => {
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
    <FlatList
      contentContainerStyle={styles.home}
      data={[
        <Title headerText={headerText} />,
        <NotificationsList />,
        <Help />,
        <User />,
      ]}
      renderItem={({item}) => item}
    />
  );
};

export default Home;
