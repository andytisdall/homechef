import {FlatList} from 'react-native';
import {useEffect} from 'react';

import Title from '../reusable/Title';
import {
  useGetUserQuery,
  useRegisterDeviceTokenMutation,
} from '../../state/apis/authApi';
import Notifications from '../../NotificationsService';
import NotificationsList from './NotificationsList';
import styles from './styles';
import User from './User';
import Help from './Help';

const Home = () => {
  const {data: user} = useGetUserQuery();

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
